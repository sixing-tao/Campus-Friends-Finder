"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const campus_1 = require("./campus");
describe('campus', function () {
    it('getBuildingByShortName', function () {
        const n = campus_1.BUILDINGS.length;
        assert.deepStrictEqual((0, campus_1.getBuildingByShortName)(campus_1.BUILDINGS[0].shortName), campus_1.BUILDINGS[0]);
        assert.deepStrictEqual((0, campus_1.getBuildingByShortName)(campus_1.BUILDINGS[9].shortName), campus_1.BUILDINGS[9]);
        assert.deepStrictEqual((0, campus_1.getBuildingByShortName)(campus_1.BUILDINGS[n - 1].shortName), campus_1.BUILDINGS[n - 1]);
    });
    it('getBuildingByShortName', function () {
        assert.deepStrictEqual((0, campus_1.locationsOnPath)([
            { start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, dist: 1 },
        ]), [{ x: 0, y: 0 }, { x: 1, y: 1 }]);
        assert.deepStrictEqual((0, campus_1.locationsOnPath)([
            { start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, dist: 1 },
            { start: { x: 1, y: 1 }, end: { x: 2, y: 2 }, dist: 1 }
        ]), [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]);
        assert.deepStrictEqual((0, campus_1.locationsOnPath)([
            { start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, dist: 1 },
            { start: { x: 1, y: 1 }, end: { x: 2, y: 2 }, dist: 1 },
            { start: { x: 2, y: 2 }, end: { x: 3, y: 3 }, dist: 1 },
        ]), [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtcHVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2FtcHVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQyxxQ0FBOEU7QUFHOUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUVqQixFQUFFLENBQUMsd0JBQXdCLEVBQUU7UUFDM0IsTUFBTSxDQUFDLEdBQUcsa0JBQVMsQ0FBQyxNQUFNLENBQUM7UUFDM0IsTUFBTSxDQUFDLGVBQWUsQ0FDbEIsSUFBQSwrQkFBc0IsRUFBQyxrQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLGtCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLCtCQUFzQixFQUFDLGtCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsa0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsK0JBQXNCLEVBQUMsa0JBQVMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsa0JBQVMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUMzQixNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLHdCQUFlLEVBQUM7WUFDWixFQUFDLEtBQUssRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUM7U0FDcEQsQ0FBQyxFQUFFLENBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFFLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLHdCQUFlLEVBQUM7WUFDWixFQUFDLEtBQUssRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUM7WUFDakQsRUFBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDO1NBQ3BELENBQUMsRUFBRSxDQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFFLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLHdCQUFlLEVBQUM7WUFDWixFQUFDLEtBQUssRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUM7WUFDakQsRUFBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDO1lBQ2pELEVBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQztTQUNwRCxDQUFDLEVBQUUsQ0FBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=