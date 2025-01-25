"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonifySchedule = exports.parseSchedule = exports.jsonifyEventStart = exports.parseEventStart = exports.jsonifyHour = exports.parseHour = exports.indexAtHour = exports.hoursAfter = exports.HOURS = void 0;
const record_1 = require("./record");
/** List of all hours at which classes start. */
exports.HOURS = [
    "8:30", "9:30", "10:30", "11:30", "12:30",
    "1:30", "2:30", "3:30", "4:30", "5:30"
];
/** Returns all hours after the given one. */
const hoursAfter = (hour) => {
    const index = exports.HOURS.indexOf(hour);
    return exports.HOURS.slice(index + 1);
};
exports.hoursAfter = hoursAfter;
/**
 * Returns the index of the event in the schedule starting at the given hour.
 * @returns index i such that schedule[i].hour === hour or -1 if noe exists
 */
const indexAtHour = (schedule, hour) => {
    for (const [idx, event] of schedule.entries()) {
        if (event.hour === hour)
            return idx;
    }
    return -1;
};
exports.indexAtHour = indexAtHour;
/** Parses JSON for an hour back into TypeScript. */
const parseHour = (data) => {
    if (typeof data !== "string")
        throw new Error(`kind is not string: ${typeof data}`);
    switch (data) {
        case "8:30":
        case "9:30":
        case "10:30":
        case "11:30":
        case "12:30":
        case "1:30":
        case "2:30":
        case "3:30":
        case "4:30":
        case "5:30":
            return data;
        default:
            throw new Error(`unknown hour: ${data}`);
    }
};
exports.parseHour = parseHour;
/** Produces JSON representing the given hour. */
const jsonifyHour = (val) => {
    return val;
};
exports.jsonifyHour = jsonifyHour;
/** Parses JSON for an event start back into TypeScript. */
const parseEventStart = (data) => {
    if (!(0, record_1.isRecord)(data))
        throw new Error(`not a record: ${typeof data}`);
    const hour = data.hour;
    const parsed_hour = (0, exports.parseHour)(hour);
    const location = data.location;
    if (typeof location !== "string")
        throw Error(`location is not a string: ${typeof location}`);
    const desc = data.desc;
    if (typeof desc !== "string")
        throw Error(`desc is not a string: ${typeof desc}`);
    return { hour: parsed_hour, location: location, desc: desc };
};
exports.parseEventStart = parseEventStart;
/** Produces JSON representing the given event start. */
const jsonifyEventStart = (val) => {
    const hour = val.hour;
    const jsonified_hour = (0, exports.jsonifyHour)(hour);
    const location = val.location;
    const desc = val.desc;
    return { hour: jsonified_hour, location: location, desc: desc };
};
exports.jsonifyEventStart = jsonifyEventStart;
/** Parses JSON for a schedule back into a TypeScript. */
const parseSchedule = (data) => {
    if (!Array.isArray(data))
        throw Error(`not an array: ${typeof data}`);
    const array_data = [];
    for (const elem_data of data) {
        const parsed_elem_data = (0, exports.parseEventStart)(elem_data);
        array_data.push(parsed_elem_data);
    }
    return array_data;
};
exports.parseSchedule = parseSchedule;
/** Produces JSON representing the given schedule. */
const jsonifySchedule = (val) => {
    const array_val = [];
    for (const elem_val of val) {
        const jsonified_elem_val = (0, exports.jsonifyEventStart)(elem_val);
        array_val.push(jsonified_elem_val);
    }
    return array_val;
};
exports.jsonifySchedule = jsonifySchedule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2NoZWR1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQW9DO0FBb0JwQyxnREFBZ0Q7QUFDbkMsUUFBQSxLQUFLLEdBQXdCO0lBQ3RDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPO0lBQ3pDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0NBQ3ZDLENBQUM7QUFHSiw2Q0FBNkM7QUFDdEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFVLEVBQWUsRUFBRTtJQUNwRCxNQUFNLEtBQUssR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sYUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFBO0FBSFksUUFBQSxVQUFVLGNBR3RCO0FBR0Q7OztHQUdHO0FBQ0ksTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFrQixFQUFFLElBQVUsRUFBVSxFQUFFO0lBQ3BFLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0MsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUk7WUFDckIsT0FBTyxHQUFHLENBQUM7S0FDZDtJQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUE7QUFOWSxRQUFBLFdBQVcsZUFNdkI7QUFHRCxvREFBb0Q7QUFDN0MsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFhLEVBQVEsRUFBRTtJQUMvQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXhELFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxNQUFNLENBQUM7UUFBQyxLQUFLLE1BQU0sQ0FBQztRQUFDLEtBQUssT0FBTyxDQUFDO1FBQUMsS0FBSyxPQUFPLENBQUM7UUFBQyxLQUFLLE9BQU8sQ0FBQztRQUNuRSxLQUFLLE1BQU0sQ0FBQztRQUFDLEtBQUssTUFBTSxDQUFDO1FBQUMsS0FBSyxNQUFNLENBQUM7UUFBQyxLQUFLLE1BQU0sQ0FBQztRQUFDLEtBQUssTUFBTTtZQUM3RCxPQUFPLElBQUksQ0FBQztRQUVkO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMxQztBQUNILENBQUMsQ0FBQztBQVpXLFFBQUEsU0FBUyxhQVlwQjtBQUVGLGlEQUFpRDtBQUMxQyxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVMsRUFBVyxFQUFFO0lBQ2hELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRlcsUUFBQSxXQUFXLGVBRXRCO0FBR0YsMkRBQTJEO0FBQ3BELE1BQU0sZUFBZSxHQUFHLENBQUMsSUFBYSxFQUFjLEVBQUU7SUFDM0QsSUFBSSxDQUFDLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUM7UUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRWhELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkIsTUFBTSxXQUFXLEdBQUcsSUFBQSxpQkFBUyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0IsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRO1FBQzlCLE1BQU0sS0FBSyxDQUFDLDZCQUE2QixPQUFPLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFOUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFDMUIsTUFBTSxLQUFLLENBQUMseUJBQXlCLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUV0RCxPQUFPLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUM7QUFoQlcsUUFBQSxlQUFlLG1CQWdCMUI7QUFFRix3REFBd0Q7QUFDakQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQWUsRUFBVyxFQUFFO0lBQzFELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDdEIsTUFBTSxjQUFjLEdBQUcsSUFBQSxtQkFBVyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDOUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUN0QixPQUFPLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUM7QUFOVyxRQUFBLGlCQUFpQixxQkFNNUI7QUFHRix5REFBeUQ7QUFDbEQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFhLEVBQVksRUFBRTtJQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDdEIsTUFBTSxLQUFLLENBQUMsaUJBQWlCLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUU5QyxNQUFNLFVBQVUsR0FBc0IsRUFBRSxDQUFDO0lBQ3pDLEtBQUssTUFBTSxTQUFTLElBQUksSUFBSSxFQUFFO1FBQzVCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSx1QkFBZSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNuQztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQVZXLFFBQUEsYUFBYSxpQkFVeEI7QUFFRixxREFBcUQ7QUFDOUMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFhLEVBQVcsRUFBRTtJQUN4RCxNQUFNLFNBQVMsR0FBbUIsRUFBRSxDQUFDO0lBQ3JDLEtBQUssTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO1FBQzFCLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDcEM7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFQVyxRQUFBLGVBQWUsbUJBTzFCIn0=