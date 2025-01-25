"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceMoreThan = exports.overlap = exports.locationsInRegion = exports.isInRegion = exports.centroid = exports.sortedLocations = exports.distance = exports.squaredDistance = exports.sameLocation = void 0;
/** Determines whether the two given locations are the same. */
const sameLocation = (loc1, loc2) => {
    return loc1.x === loc2.x && loc1.y === loc2.y;
};
exports.sameLocation = sameLocation;
/** Returns the squared distance between the two given locations */
const squaredDistance = (loc1, loc2) => {
    const dx = loc1.x - loc2.x;
    const dy = loc1.y - loc2.y;
    return dx * dx + dy * dy;
};
exports.squaredDistance = squaredDistance;
/** Returns the distance between the two given locations */
const distance = (loc1, loc2) => {
    return Math.sqrt((0, exports.squaredDistance)(loc1, loc2));
};
exports.distance = distance;
/**
 * Returns the locations in the given array but ordered so that they are
 * increasing in the given dimension.
 * @param locs The list of locations to sort
 * @param dim The coordinate to sort on
 * @returns The same locations as in locs but now in sorted order.
 */
const sortedLocations = (locs, dim) => {
    locs = locs.slice(0);
    if (dim === "x") {
        locs.sort((a, b) => a.x - b.x);
    }
    else {
        locs.sort((a, b) => a.y - b.y);
    }
    return locs;
};
exports.sortedLocations = sortedLocations;
/**
 * Returns the average position of the given locations.
 * @requires locs.length >= 1
 */
const centroid = (locs) => {
    let sx = 0;
    let sy = 0;
    let i = 0;
    // Inv: sx = sum of locs[j].x for j = 0 .. i-1 and
    //      sy = sum of locs[j].y for j = 0 .. i-1
    while (i !== locs.length) {
        sx += locs[i].x;
        sy += locs[i].y;
        i = i + 1;
    }
    return { x: sx / locs.length, y: sy / locs.length };
};
exports.centroid = centroid;
/** Determines whether the given location falls inside the given region. */
const isInRegion = (loc, region) => {
    return (region.x1 <= loc.x &&
        loc.x <= region.x2 &&
        region.y1 <= loc.y &&
        loc.y <= region.y2);
};
exports.isInRegion = isInRegion;
/** Returns the subset of the given locations inside the given region. */
const locationsInRegion = (locs, region) => {
    const inLocs = [];
    // Inv: inLocs = locationsInRegion(locs[0 .. i-1], region)
    for (const loc of locs) {
        if ((0, exports.isInRegion)(loc, region))
            inLocs.push(loc);
    }
    return inLocs;
};
exports.locationsInRegion = locationsInRegion;
/** Determines if the two given regions overlap. */
const overlap = (region1, region2) => {
    const noOverlapX = region1.x2 < region2.x1 || region2.x2 < region1.x1;
    const noOverlapY = region1.y2 < region2.y1 || region2.y2 < region1.y1;
    return !noOverlapX && !noOverlapY;
};
exports.overlap = overlap;
/**
 * Determines whether the distance of the given location to the closest point in
 * the given region is more than the given amount. Note that this calculation is
 * done without any calls to "distance" above (i.e., with no square roots).
 */
const distanceMoreThan = (loc, region, dist) => {
    let closestX;
    let closestY;
    // if the location is in the region
    if ((0, exports.isInRegion)(loc, region)) {
        return false;
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
    const squaredDist = (0, exports.squaredDistance)(loc, { x: closestX, y: closestY });
    return squaredDist > dist * dist;
};
exports.distanceMoreThan = distanceMoreThan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvY2F0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSwrREFBK0Q7QUFDeEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFjLEVBQUUsSUFBYyxFQUFXLEVBQUU7SUFDdEUsT0FBTyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQztBQUZXLFFBQUEsWUFBWSxnQkFFdkI7QUFFRixtRUFBbUU7QUFDNUQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUFjLEVBQUUsSUFBYyxFQUFVLEVBQUU7SUFDeEUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQixPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUMzQixDQUFDLENBQUM7QUFKVyxRQUFBLGVBQWUsbUJBSTFCO0FBRUYsMkRBQTJEO0FBQ3BELE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBYyxFQUFFLElBQWMsRUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLHVCQUFlLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBRlcsUUFBQSxRQUFRLFlBRW5CO0FBRUY7Ozs7OztHQU1HO0FBQ0ksTUFBTSxlQUFlLEdBQUcsQ0FDN0IsSUFBcUIsRUFDckIsR0FBYyxFQUNHLEVBQUU7SUFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSSxHQUFHLEtBQUssR0FBRyxF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