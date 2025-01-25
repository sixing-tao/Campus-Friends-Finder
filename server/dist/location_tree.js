"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.squareDistToRegion = exports.closestInTree = exports.NO_INFO = exports.findClosestInTree = exports.findLocationsInRegion = exports.buildTree = void 0;
const locations_1 = require("./locations");
/**
 * Returns a tree containing exactly the given locations. Some effort is made to
 * try to split the locations evenly so that the resulting tree has low height.
 */
const buildTree = (locs) => {
    if (locs.length === 0) {
        return { kind: "empty" };
    }
    else if (locs.length === 1) {
        return { kind: "single", loc: locs[0] };
    }
    else {
        // We must be careful to include each point in *exactly* one subtree. The
        // regions created below touch on the boundary, so we exlude them from the
        // lower side of each boundary.
        const c = (0, locations_1.centroid)(locs);
        return {
            kind: "split",
            at: c,
            nw: (0, exports.buildTree)((0, locations_1.locationsInRegion)(locs, {
                x1: -Infinity,
                x2: c.x,
                y1: -Infinity,
                y2: c.y,
            }).filter((loc) => loc.x !== c.x && loc.y !== c.y)),
            ne: (0, exports.buildTree)((0, locations_1.locationsInRegion)(locs, {
                x1: c.x,
                x2: Infinity,
                y1: -Infinity,
                y2: c.y,
            }).filter((loc) => loc.y !== c.y)),
            sw: (0, exports.buildTree)((0, locations_1.locationsInRegion)(locs, {
                x1: -Infinity,
                x2: c.x,
                y1: c.y,
                y2: Infinity,
            }).filter((loc) => loc.x !== c.x)),
            se: (0, exports.buildTree)((0, locations_1.locationsInRegion)(locs, {
                x1: c.x,
                x2: Infinity,
                y1: c.y,
                y2: Infinity,
            })),
        };
    }
};
exports.buildTree = buildTree;
/** Returns all the locations in the given tree that fall within the region. */
const findLocationsInRegion = (tree, region) => {
    const locs = [];
    addLocationsInRegion(tree, region, { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity }, locs);
    return locs;
};
exports.findLocationsInRegion = findLocationsInRegion;
/**
 * Adds all locations in the given tree that fall within the given region
 * to the end of the given array.
 * @param tree The (subtree) in which to search
 * @param region Find locations inside this region
 * @param bounds A region that contains all locations in the tree
 * @param locs Array in which to add all the locations found
 * @modifies locs
 * @effects locs = locs_0 ++ all locations in the tree within this region
 */
const addLocationsInRegion = (tree, region, bounds, locs) => {
    if (tree.kind === "empty") {
        // nothing to add
    }
    else if (tree.kind === "single") {
        if ((0, locations_1.isInRegion)(tree.loc, region))
            locs.push(tree.loc);
    }
    else if (!(0, locations_1.overlap)(bounds, region)) {
        // no points are within the region
    }
    else {
        addLocationsInRegion(tree.nw, region, { x1: bounds.x1, x2: tree.at.x, y1: bounds.y1, y2: tree.at.y }, locs);
        addLocationsInRegion(tree.ne, region, { x1: tree.at.x, x2: bounds.x2, y1: bounds.y1, y2: tree.at.y }, locs);
        addLocationsInRegion(tree.sw, region, { x1: bounds.x1, x2: tree.at.x, y1: tree.at.y, y2: bounds.y2 }, locs);
        addLocationsInRegion(tree.se, region, { x1: tree.at.x, x2: bounds.x2, y1: tree.at.y, y2: bounds.y2 }, locs);
    }
};
/**
 * Returns closest of any locations in the tree to any of the given location.
 * @param tree A tree containing locations to compare to
 * @param loc The location to which to cmopare them
 * @returns the closest point in the tree to that location, paired with its
 *     distance to the closest location in locs
 */
const findClosestInTree = (tree, locs) => {
    if (locs.length === 0)
        throw new Error("no locations passed in");
    if (tree.kind === "empty")
        throw new Error("no locations in the tree passed in");
    let closest = (0, exports.closestInTree)(tree, locs[0], EVERYWHERE, exports.NO_INFO);
    for (const loc of locs) {
        const cl = (0, exports.closestInTree)(tree, loc, EVERYWHERE, exports.NO_INFO);
        if (cl.dist < closest.dist)
            closest = cl;
    }
    if (closest.loc === undefined)
        throw new Error("impossible: no closest found");
    return [closest.loc, closest.dist];
};
exports.findClosestInTree = findClosestInTree;
/** Bounds that include the entire plane. */
const EVERYWHERE = {
    x1: -Infinity,
    x2: Infinity,
    y1: -Infinity,
    y2: Infinity,
};
/** A record that stores no closest point and no calculations performed. */
exports.NO_INFO = {
    loc: undefined,
    dist: Infinity,
    calcs: 0,
};
/**
 * Like above but also tracks all the information in a ClosestInfo record.
 * The closest point returned is now the closer of the point found in the tree
 * and the one passed in as an argument and the number of calculations is the
 * sum of the number performed and the number passed in.
 */
const closestInTree = (tree, loc, bounds, closest) => {
    // Skip searching the subtree.
    if ((0, locations_1.distanceMoreThan)(loc, bounds, closest.dist)) {
        return closest;
    }
    // Do nothing when tree = empty
    if (tree.kind === "empty") {
        return closest;
    }
    // Handle tree = single
    if (tree.kind === "single") {
        const tempDist = (0, locations_1.distance)(tree.loc, loc);
        const newCalcs = closest.calcs + 1;
        if (tempDist < closest.dist) {
            return { loc: tree.loc, dist: tempDist, calcs: newCalcs };
        }
        else {
            return { loc: closest.loc, dist: closest.dist, calcs: newCalcs };
        }
    }
    // Handle tree = split
    if (tree.kind === "split") {
        const nwBounds = {
            x1: bounds.x1,
            x2: tree.at.x,
            y1: bounds.y1,
            y2: tree.at.y,
        };
        const neBounds = {
            x1: tree.at.x,
            x2: bounds.x2,
            y1: bounds.y1,
            y2: tree.at.y,
        };
        const swBounds = {
            x1: bounds.x1,
            x2: tree.at.x,
            y1: tree.at.y,
            y2: bounds.y2,
        };
        const seBounds = {
            x1: tree.at.x,
            x2: bounds.x2,
            y1: tree.at.y,
            y2: bounds.y2,
        };
        const subregions = [
            { tree: tree.nw, bounds: nwBounds },
            { tree: tree.ne, bounds: neBounds },
            { tree: tree.sw, bounds: swBounds },
            { tree: tree.se, bounds: seBounds },
        ];
        // use the helper method to find out which is the closest.
        subregions.sort((a, b) => (0, exports.squareDistToRegion)(loc, a.bounds) - (0, exports.squareDistToRegion)(loc, b.bounds));
        for (const subregion of subregions) {
            closest = (0, exports.closestInTree)(subregion.tree, loc, subregion.bounds, closest);
        }
        return closest;
    }
    // avoid returning undefined
    return closest;
};
exports.closestInTree = closestInTree;
/**
 * Helper method to calculate the squared distance from a given location to
 * the nearest point within a rectangular region. Returns 0 if the location
 * is inside the region.
 * @param loc The location to calculate the distance from.
 * @param region The rectangular region to calculate the distance to.
 * @returns The squared distance to the closest point in the region.
 */
const squareDistToRegion = (loc, region) => {
    let closestX;
    let closestY;
    // if the location is in the region
    if ((0, locations_1.isInRegion)(loc, region)) {
        return 0;
    }
    // if the location is not in the region
    if (loc.x < region.x1) {
        closestX = region.x1;
    }
    else if (loc.x > region.x2) {
        closestX = region.x2;
    }
    else {
        closestX = loc.x;
    }
    if (loc.y < region.y1) {
        closestY = region.y1;
    }
    else if (loc.y > region.y2) {
        closestY = region.y2;
    }
    else {
        closestY = loc.y;
    }
    return (0, locations_1.squaredDistance)(loc, { x: closestX, y: closestY });
};
exports.squareDistToRegion = squareDistToRegion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGlvbl90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQVVxQjtBQWNyQjs7O0dBR0c7QUFDSSxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQXFCLEVBQWdCLEVBQUU7SUFDL0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0tBQzFCO1NBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUM1QixPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDekM7U0FBTTtRQUNMLHlFQUF5RTtRQUN6RSwwRUFBMEU7UUFDMUUsK0JBQStCO1FBQy9CLE1BQU0sQ0FBQyxHQUFhLElBQUEsb0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLE9BQU87WUFDYixFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxJQUFBLGlCQUFTLEVBQ1gsSUFBQSw2QkFBaUIsRUFBQyxJQUFJLEVBQUU7Z0JBQ3RCLEVBQUUsRUFBRSxDQUFDLFFBQVE7Z0JBQ2IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNQLEVBQUUsRUFBRSxDQUFDLFFBQVE7Z0JBQ2IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNuRDtZQUNELEVBQUUsRUFBRSxJQUFBLGlCQUFTLEVBQ1gsSUFBQSw2QkFBaUIsRUFBQyxJ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