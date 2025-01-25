import * as assert from "assert";
import {
  buildTree,
  findLocationsInRegion,
  findClosestInTree,
  squareDistToRegion,
  closestInTree,
  NO_INFO,
} from "./location_tree";

describe("location_tree", function () {
  it("buildTree", function () {
    assert.deepStrictEqual(buildTree([]), { kind: "empty" });

    assert.deepStrictEqual(buildTree([{ x: 1, y: 1 }]), {
      kind: "single",
      loc: { x: 1, y: 1 },
    });
    assert.deepStrictEqual(buildTree([{ x: 2, y: 2 }]), {
      kind: "single",
      loc: { x: 2, y: 2 },
    });

    assert.deepStrictEqual(
      buildTree([
        { x: 1, y: 1 },
        { x: 3, y: 3 },
      ]),
      {
        kind: "split",
        at: { x: 2, y: 2 },
        nw: { kind: "single", loc: { x: 1, y: 1 } },
        ne: { kind: "empty" },
        sw: { kind: "empty" },
        se: { kind: "single", loc: { x: 3, y: 3 } },
      }
    );
    assert.deepStrictEqual(
      buildTree([
        { x: 1, y: 3 },
        { x: 3, y: 1 },
      ]),
      {
        kind: "split",
        at: { x: 2, y: 2 },
        nw: { kind: "empty" },
        ne: { kind: "single", loc: { x: 3, y: 1 } },
        sw: { kind: "single", loc: { x: 1, y: 3 } },
        se: { kind: "empty" },
      }
    );

    assert.deepStrictEqual(
      buildTree([
        { x: 1, y: 1 },
        { x: 3, y: 3 },
        { x: 5, y: 5 },
        { x: 7, y: 7 },
      ]),
      {
        kind: "split",
        at: { x: 4, y: 4 },
        nw: {
          kind: "split",
          at: { x: 2, y: 2 },
          nw: { kind: "single", loc: { x: 1, y: 1 } },
          ne: { kind: "empty" },
          sw: { kind: "empty" },
          se: { kind: "single", loc: { x: 3, y: 3 } },
        },
        ne: { kind: "empty" },
        sw: { kind: "empty" },
        se: {
          kind: "split",
          at: { x: 6, y: 6 },
          nw: { kind: "single", loc: { x: 5, y: 5 } },
          ne: { kind: "empty" },
          sw: { kind: "empty" },
          se: { kind: "single", loc: { x: 7, y: 7 } },
        },
      }
    );
    assert.deepStrictEqual(
      buildTree([
        { x: 1, y: 1 },
        { x: 3, y: 3 },
        { x: 5, y: 3 },
        { x: 7, y: 1 },
        { x: 1, y: 7 },
        { x: 3, y: 5 },
        { x: 5, y: 5 },
        { x: 7, y: 7 },
      ]),
      {
        kind: "split",
        at: { x: 4, y: 4 },
        nw: {
          kind: "split",
          at: { x: 2, y: 2 },
          nw: { kind: "single", loc: { x: 1, y: 1 } },
          ne: { kind: "empty" },
          sw: { kind: "empty" },
          se: { kind: "single", loc: { x: 3, y: 3 } },
        },
        ne: {
          kind: "split",
          at: { x: 6, y: 2 },
          nw: { kind: "empty" },
          sw: { kind: "single", loc: { x: 5, y: 3 } },
          ne: { kind: "single", loc: { x: 7, y: 1 } },
          se: { kind: "empty" },
        },
        sw: {
          kind: "split",
          at: { x: 2, y: 6 },
          nw: { kind: "empty" },
          ne: { kind: "single", loc: { x: 3, y: 5 } },
          sw: { kind: "single", loc: { x: 1, y: 7 } },
          se: { kind: "empty" },
        },
        se: {
          kind: "split",
          at: { x: 6, y: 6 },
          nw: { kind: "single", loc: { x: 5, y: 5 } },
          ne: { kind: "empty" },
          sw: { kind: "empty" },
          se: { kind: "single", loc: { x: 7, y: 7 } },
        },
      }
    );
  });

  it("findLocationsInRegion", function () {
    assert.deepStrictEqual(
      findLocationsInRegion(buildTree([]), { x1: 1, x2: 2, y1: 1, y2: 2 }),
      []
    );

    assert.deepStrictEqual(
      findLocationsInRegion(buildTree([{ x: 0, y: 0 }]), {
        x1: 1,
        x2: 3,
        y1: 1,
        y2: 3,
      }),
      []
    );
    assert.deepStrictEqual(
      findLocationsInRegion(buildTree([{ x: 2, y: 2 }]), {
        x1: 1,
        x2: 3,
        y1: 1,
        y2: 3,
      }),
      [{ x: 2, y: 2 }]
    );

    assert.deepStrictEqual(
      findLocationsInRegion(
        buildTree([
          { x: 0, y: 0 },
          { x: 2, y: 2 },
        ]),
        { x1: 1, x2: 3, y1: 1, y2: 3 }
      ),
      [{ x: 2, y: 2 }]
    );
    assert.deepStrictEqual(
      findLocationsInRegion(
        buildTree([
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 4 },
        ]),
        { x1: 1, x2: 3, y1: 1, y2: 3 }
      ),
      [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]
    );
    assert.deepStrictEqual(
      findLocationsInRegion(
        buildTree([
          { x: 0, y: 4 },
          { x: 1, y: 3 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 0 },
        ]),
        { x1: 1, x2: 3, y1: 1, y2: 3 }
      ),
      [
        { x: 2, y: 2 },
        { x: 1, y: 3 },
      ]
    );
  });

  it("closestInTree", function () {
    // These test cases have meet the requirement for statement(cover every lines),
    // brench(cover every if-else statements), and loop/recursion coverage
    // (0, 1, multiple).

    // Test: Empty tree
    // 0 recursion
    assert.deepStrictEqual(
      closestInTree(
        { kind: "empty" },
        { x: 2, y: 2 },
        { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity },
        NO_INFO
      ),
      { loc: undefined, dist: Infinity, calcs: 0 }
    );

    // Test: Single node tree
    assert.deepStrictEqual(
      closestInTree(
        { kind: "single", loc: { x: 1, y: 1 } },
        { x: 2, y: 2 },
        { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity },
        NO_INFO
      ),
      { loc: { x: 1, y: 1 }, dist: Math.sqrt(2), calcs: 1 }
    );

    // Test: Split tree
    // 1 recursion
    assert.deepStrictEqual(
      closestInTree(
        buildTree([
          { x: 1, y: 1 },
          { x: 4, y: 4 },
          { x: 6, y: 2 },
          { x: 2, y: 6 },
        ]),
        { x: 5, y: 5 },
        { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity },
        NO_INFO
      ),
      { loc: { x: 4, y: 4 }, dist: Math.sqrt(2), calcs: 1 }
    );

    // Test: Split tree containing another split tree
    // mulitple recursion
    assert.deepStrictEqual(
      closestInTree(
        buildTree([
          { x: 1, y: 1 }, // NW region
          { x: 4, y: 4 }, // SE region
          { x: 6, y: 2 }, // NE region
          { x: 2, y: 6 }, // SW region
          { x: 5, y: 5 }, // Additional point in SE region
        ]),
        { x: 5.5, y: 4.5 }, // Target close to SE region
        { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity },
        NO_INFO
      ),
      {
        loc: { x: 5, y: 5 },
        dist: Math.sqrt(0.5 ** 2 + 0.5 ** 2),
        calcs: 1,
      }
    );
    // Go through the else statement inside if (tree.kind === "single")
    assert.deepStrictEqual(
      closestInTree(
        buildTree([
          { x: 1, y: 1 }, // NW region
          { x: 4, y: 4 }, // SE region
          { x: 6, y: 2 }, // NE region
          { x: 2, y: 6 }, // SW region
          { x: 5, y: 5 }, // Additional point in SE region
        ]),
        { x: 3, y: 3 },
        { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity },
        NO_INFO
      ),
      {
        loc: { x: 4, y: 4 },
        dist: Math.sqrt(2),
        calcs: 4,
      }
    );
  });

  // test for helper method
  it("squareDistToRegion", function () {
    const region = { x1: 1, x2: 3, y1: 1, y2: 3 };

    // Point inside the region
    assert.deepStrictEqual(squareDistToRegion({ x: 2, y: 2 }, region), 0);

    // Point outside to the left
    assert.deepStrictEqual(squareDistToRegion({ x: 0, y: 2 }, region), 1);

    // Point outside above
    assert.deepStrictEqual(squareDistToRegion({ x: 2, y: 4 }, region), 1);

    // Point outside below and to the left
    assert.deepStrictEqual(squareDistToRegion({ x: 0, y: 0 }, region), 2);

    // Point on the boundary
    assert.deepStrictEqual(squareDistToRegion({ x: 1, y: 2 }, region), 0);

    // Point far outside the region
    assert.deepStrictEqual(squareDistToRegion({ x: -5, y: -5 }, region), 72);
  });

  it("findClosestInTree", function () {
    assert.deepStrictEqual(
      findClosestInTree(buildTree([{ x: 2, y: 1 }]), [{ x: 1, y: 1 }]),
      [{ x: 2, y: 1 }, 1]
    );
    assert.deepStrictEqual(
      findClosestInTree(
        buildTree([
          { x: 3, y: 1 },
          { x: 2, y: 1 },
          { x: 1, y: 3 },
        ]),
        [{ x: 1, y: 1 }]
      ),
      [{ x: 2, y: 1 }, 1]
    );
    assert.deepStrictEqual(
      findClosestInTree(
        buildTree([
          { x: 1, y: 1 },
          { x: 1, y: 5 },
          { x: 5, y: 1 },
          { x: 5, y: 5 },
        ]),
        [{ x: 2, y: 1 }]
      ),
      [{ x: 1, y: 1 }, 1]
    );
    assert.deepStrictEqual(
      findClosestInTree(
        buildTree([
          { x: 1, y: 1 },
          { x: 1, y: 5 },
          { x: 5, y: 1 },
          { x: 5, y: 5 },
        ]),
        [
          { x: 2, y: 1 },
          { x: 4.9, y: 4.9 },
        ]
      ),
      [{ x: 5, y: 5 }, Math.sqrt((5 - 4.9) ** 2 + (5 - 4.9) ** 2)]
    );
    assert.deepStrictEqual(
      findClosestInTree(
        buildTree([
          { x: 1, y: 1 },
          { x: 1, y: 5 },
          { x: 5, y: 1 },
          { x: 5, y: 5 },
        ]),
        [
          { x: 2, y: 1 },
          { x: -1, y: -1 },
        ]
      ),
      [{ x: 1, y: 1 }, 1]
    );
    assert.deepStrictEqual(
      findClosestInTree(
        buildTree([
          { x: 1, y: 1 },
          { x: 1, y: 5 },
          { x: 5, y: 1 },
          { x: 5, y: 5 },
        ]),
        [
          { x: 4, y: 1 },
          { x: -1, y: -1 },
          { x: 10, y: 10 },
        ]
      ),
      [{ x: 5, y: 1 }, 1]
    );
  });
});
