"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPath = void 0;
const locations_1 = require("./locations");
const heap_1 = require("./heap");
// Compares two paths by which is shorter.
const comparePaths = (a, b) => {
    const [est1, _] = a;
    const [est2, __] = b;
    return est1 - est2;
};
// Converts a location to a string that can be used as a map key.
const toKey = (loc) => `(${loc.x}, ${loc.y})`;
/**
 * Returns the shortest path from the given start to the given ending location
 * that can be made by following along the given edges. If no path exists, then
 * this will return undefined. (Note that all distances must be positive or else
 * findPath may not work!)
 */
const findPath = (start, end, edges) => {
    const graph = map(edges);
    // Set of locations for which we already found the shortest path.
    const found = new Set();
    // Queue of paths out of nodes with found paths.
    const queue = (0, heap_1.newHeap)(comparePaths);
    queue.add([(0, locations_1.distance)(start, end), { start: start, end: start, steps: [], dist: 0 }]); // empty path
    // Inv: path.end !== end for all paths in queue such that 
    //      found.contains(path) == false
    while (!queue.isEmpty()) {
        const [_, path] = queue.removeMin();
        if ((0, locations_1.sameLocation)(path.end, end))
            return path; // found one and it must be shortest since it was first
        const key = toKey(path.end);
        if (found.has(key))
            continue;
        found.add(key);
        const curr = graph.get(key);
        if (curr !== undefined) {
            const unfound = curr.filter((n) => !found.has(toKey(n.end)));
            for (const next of unfound) {
                queue.add([path.dist + next.dist + (0, locations_1.distance)(next.end, end), {
                        start: path.start, end: next.end,
                        steps: path.steps.concat([next]), dist: path.dist + next.dist
                    }]);
            }
        }
    }
    return undefined; // no path to end
};
exports.findPath = findPath;
// Map from each location to all edges *out* of it
const map = (edges) => {
    const graph = new Map();
    for (const e of edges) {
        let children = graph.get(toKey(e.start));
        if (children === undefined) {
            children = [];
            graph.set(toKey(e.start), children);
        }
        children.push(e);
    }
    return graph;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGZpbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXRoZmluZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUErRDtBQUUvRCxpQ0FBdUM7QUFZdkMsMENBQTBDO0FBQzFDLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBaUIsRUFBRSxDQUFpQixFQUFVLEVBQUU7SUFDcEUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLENBQUMsQ0FBQTtBQUVELGlFQUFpRTtBQUNqRSxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQWEsRUFBVSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUVoRTs7Ozs7R0FLRztBQUNJLE1BQU0sUUFBUSxHQUFHLENBQ3BCLEtBQWUsRUFBRSxHQUFhLEVBQUUsS0FBa0IsRUFBb0IsRUFBRTtJQUMxRSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsaUVBQWlFO0lBQ2pFLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7SUFFaEMsZ0RBQWdEO0lBQ2hELE1BQU0sS0FBSyxHQUF5QixJQUFBLGNBQU8sRUFBaUIsWUFBWSxDQUFDLENBQUM7SUFDMUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUEsb0JBQVEsRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsYUFBYTtJQUVqRywwREFBMEQ7SUFDMUQscUNBQXFDO0lBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDdkIsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEMsSUFBSSxJQUFBLHdCQUFZLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUMsQ0FBRSx1REFBdUQ7UUFFdkUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ2hCLFNBQVM7UUFDWCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWYsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDdEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELEtBQUssTUFBTSxJQUFJLElBQUksT0FBTyxFQUFFO2dCQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUEsb0JBQVEsRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUN4RCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7d0JBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7cUJBQzlELENBQUMsQ0FBQyxDQUFDO2FBQ0w7U0FDSjtLQUNGO0lBRUQsT0FBTyxTQUFTLENBQUMsQ0FBRSxpQkFBaUI7QUFDdEMsQ0FBQyxDQUFDO0FBbkNXLFFBQUEsUUFBUSxZQW1DbkI7QUFFRixrREFBa0Q7QUFDbEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFrQixFQUE0QixFQUFFO0lBQzNELE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUF1QixDQUFDO0lBQzdDLEtBQUssTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFO1FBQ3JCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQixRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3BDO1FBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFBIn0=