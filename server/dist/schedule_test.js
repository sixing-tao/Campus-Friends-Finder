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
const schedule_1 = require("./schedule");
describe('schedule', function () {
    it('hoursAfter', function () {
        assert.deepStrictEqual((0, schedule_1.hoursAfter)("8:30"), ["9:30", "10:30", "11:30", "12:30", "1:30", "2:30", "3:30", "4:30", "5:30"]);
        assert.deepStrictEqual((0, schedule_1.hoursAfter)("11:30"), ["12:30", "1:30", "2:30", "3:30", "4:30", "5:30"]);
        assert.deepStrictEqual((0, schedule_1.hoursAfter)("12:30"), ["1:30", "2:30", "3:30", "4:30", "5:30"]);
        assert.deepStrictEqual((0, schedule_1.hoursAfter)("1:30"), ["2:30", "3:30", "4:30", "5:30"]);
        assert.deepStrictEqual((0, schedule_1.hoursAfter)("5:30"), []);
    });
    it('indexAtHour', function () {
        const schedule = [
            { hour: "11:30", location: "MLR", desc: "CSE 331" },
            { hour: "12:30", location: "HUB", desc: "lunch" },
            { hour: "1:30", location: "SUZ", desc: "studying" },
            { hour: "2:30", location: "CS2", desc: "CSE 311" },
        ];
        assert.deepStrictEqual((0, schedule_1.indexAtHour)(schedule, "10:30"), -1);
        assert.deepStrictEqual((0, schedule_1.indexAtHour)(schedule, "11:30"), 0);
        assert.deepStrictEqual((0, schedule_1.indexAtHour)(schedule, "12:30"), 1);
        assert.deepStrictEqual((0, schedule_1.indexAtHour)(schedule, "1:30"), 2);
        assert.deepStrictEqual((0, schedule_1.indexAtHour)(schedule, "2:30"), 3);
        assert.deepStrictEqual((0, schedule_1.indexAtHour)(schedule, "3:30"), -1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlZHVsZV90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFDakMseUNBQStEO0FBRy9ELFFBQVEsQ0FBQyxVQUFVLEVBQUU7SUFFbkIsRUFBRSxDQUFDLFlBQVksRUFBRTtRQUNmLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxxQkFBVSxFQUFDLE1BQU0sQ0FBQyxFQUNyQyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEscUJBQVUsRUFBQyxPQUFPLENBQUMsRUFDdEMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLHFCQUFVLEVBQUMsT0FBTyxDQUFDLEVBQ3RDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLHFCQUFVLEVBQUMsTUFBTSxDQUFDLEVBQ3JDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEscUJBQVUsRUFBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxhQUFhLEVBQUU7UUFDaEIsTUFBTSxRQUFRLEdBQWE7WUFDdkIsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztZQUNqRCxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO1lBQy9DLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7WUFDakQsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztTQUNqRCxDQUFDO1FBQ0osTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxzQkFBVyxFQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsc0JBQVcsRUFBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxzQkFBVyxFQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==