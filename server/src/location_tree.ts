import {
  Location,
  Region,
  centroid,
  isInRegion,
  locationsInRegion,
  overlap,
  distanceMoreThan,
  distance,
  squaredDistance,
} from "./locations";

export type LocationTree =
  | { readonly kind: "empty" }
  | { readonly kind: "single"; readonly loc: Location }
  | {
      readonly kind: "split";
      readonly at: Location;
      readonly nw: LocationTree;
      readonly ne: LocationTree;
      readonly sw: LocationTree;
      readonly se: LocationTree;
    };

/**
 * Returns a tree containing exactly the given locations. Some effort is made to
 * try to split the locations evenly so that the resulting tree has low height.
 */
export const buildTree = (locs: Array<Location>): LocationTree => {
  if (locs.length === 0) {
    return { kind: "empty" };
  } else if (locs.length === 1) {
    return { kind: "single", loc: locs[0] };
  } else {
    // We must be careful to include each point in *exactly* one subtree. The
    // regions created below touch on the boundary, so we exlude them from the
    // lower side of each boundary.
    const c: Location = centroid(locs);
    return {
      kind: "split",
      at: c,
      nw: buildTree(
        locationsInRegion(locs, {
          x1: -Infinity,
          x2: c.x,
          y1: -Infinity,
          y2: c.y,
        }).filter((loc) => loc.x !== c.x && loc.y !== c.y)
      ), // exclude boundaries
      ne: buildTree(
        locationsInRegion(locs, {
          x1: c.x,
          x2: Infinity,
          y1: -Infinity,
          y2: c.y,
        }).filter((loc) => loc.y !== c.y)
      ), // exclude Y boundary
      sw: buildTree(
        locationsInRegion(locs, {
          x1: -Infinity,
          x2: c.x,
          y1: c.y,
          y2: Infinity,
        }).filter((loc) => loc.x !== c.x)
      ), // exclude X boundary
      se: buildTree(
        locationsInRegion(locs, {
          x1: c.x,
          x2: Infinity,
          y1: c.y,
          y2: Infinity,
        })
      ),
    };
  }
};

/** Returns all the locations in the given tree that fall within the region. */
export const findLocationsInRegion = (
  tree: LocationTree,
  region: Region
): Array<Location> => {
  const locs: Array<Location> = [];
  addLocationsInRegion(
    tree,
    region,
    { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity },
    locs
  );
  return locs;
};

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
const addLocationsInRegion = (
  tree: LocationTree,
  region: Region,
  bounds: Region,
  locs: Array<Location>
): void => {
  if (tree.kind === "empty") {
    // nothing to add
  } else if (tree.kind === "single") {
    if (isInRegion(tree.loc, region)) locs.push(tree.loc);
  } else if (!overlap(bounds, region)) {
    // no points are within the region
  } else {
    addLocationsInRegion(
      tree.nw,
      region,
      { x1: bounds.x1, x2: tree.at.x, y1: bounds.y1, y2: tree.at.y },
      locs
    );
    addLocationsInRegion(
      tree.ne,
      region,
      { x1: tree.at.x, x2: bounds.x2, y1: bounds.y1, y2: tree.at.y },
      locs
    );
    addLocationsInRegion(
      tree.sw,
      region,
      { x1: bounds.x1, x2: tree.at.x, y1: tree.at.y, y2: bounds.y2 },
      locs
    );
    addLocationsInRegion(
      tree.se,
      region,
      { x1: tree.at.x, x2: bounds.x2, y1: tree.at.y, y2: bounds.y2 },
      locs
    );
  }
};

/**
 * Returns closest of any locations in the tree to any of the given location.
 * @param tree A tree containing locations to compare to
 * @param loc The location to which to cmopare them
 * @returns the closest point in the tree to that location, paired with its
 *     distance to the closest location in locs
 */
export const findClosestInTree = (
  tree: LocationTree,
  locs: Array<Location>
): [Location, number] => {
  if (locs.length === 0) throw new Error("no locations passed in");
  if (tree.kind === "empty")
    throw new Error("no locations in the tree passed in");

  let closest = closestInTree(tree, locs[0], EVERYWHERE, NO_INFO);
  for (const loc of locs) {
    const cl = closestInTree(tree, loc, EVERYWHERE, NO_INFO);
    if (cl.dist < closest.dist) closest = cl;
  }
  if (closest.loc === undefined)
    throw new Error("impossible: no closest found");
  return [closest.loc, closest.dist];
};

/** Bounds that include the entire plane. */
const EVERYWHERE: Region = {
  x1: -Infinity,
  x2: Infinity,
  y1: -Infinity,
  y2: Infinity,
};

/**
 * A record containing the closest point found in the tree to reference point
 * (or undefined if the tree is empty), the distance of that point to the
 * reference point (or infinity if the tree is empty), and the number of
 * distance calculations made during this process.
 */
type ClosestInfo = { loc: Location | undefined; dist: number; calcs: number };

/** A record that stores no closest point and no calculations performed. */
export const NO_INFO: ClosestInfo = {
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
export const closestInTree = (
  tree: LocationTree,
  loc: Location,
  bounds: Region,
  closest: ClosestInfo
): ClosestInfo => {
  // Skip searching the subtree.
  if (distanceMoreThan(loc, bounds, closest.dist)) {
    return closest;
  }
  // Do nothing when tree = empty
  if (tree.kind === "empty") {
    return closest;
  }
  // Handle tree = single
  if (tree.kind === "single") {
    const tempDist = distance(tree.loc, loc);
    const newCalcs = closest.calcs + 1;
    if (tempDist < closest.dist) {
      return { loc: tree.loc, dist: tempDist, calcs: newCalcs };
    } else {
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
    subregions.sort((a, b) => squareDistToRegion(loc, a.bounds)-squareDistToRegion(loc, b.bounds));
    for (const subregion of subregions) {
      closest = closestInTree(subregion.tree, loc, subregion.bounds, closest);
    }
    return closest;
  }
  // avoid returning undefined
  return closest;
};

/**
 * Helper method to calculate the squared distance from a given location to
 * the nearest point within a rectangular region. Returns 0 if the location
 * is inside the region.
 * @param loc The location to calculate the distance from.
 * @param region The rectangular region to calculate the distance to.
 * @returns The squared distance to the closest point in the region.
 */
export const squareDistToRegion = (loc: Location, region: Region): number => {
  let closestX;
  let closestY;
  // if the location is in the region
  if (isInRegion(loc, region)) {
    return 0;
  }
  // if the location is not in the region
  if (loc.x < region.x1) {
    closestX = region.x1;
  } else if (loc.x > region.x2) {
    closestX = region.x2;
  } else {
    closestX = loc.x;
  }
  if (loc.y < region.y1) {
    closestY = region.y1;
  } else if (loc.y > region.y2) {
    closestY = region.y2;
  } else {
    closestY = loc.y;
  }
  return squaredDistance(loc, { x: closestX, y: closestY });
};
