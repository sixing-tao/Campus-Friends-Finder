"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonifyFriends = exports.parseFriends = void 0;
/** Parses JSON produced by jsonifyFriends back into a Friends. */
const parseFriends = (data) => {
    if (!Array.isArray(data))
        throw Error(`not an array: ${typeof data}`);
    const array_data = [];
    for (const elem_data of data) {
        if (typeof elem_data !== "string")
            throw Error(`not a string: ${typeof elem_data}`);
        array_data.push(elem_data);
    }
    return array_data;
};
exports.parseFriends = parseFriends;
/** Turns a friends list into JSON. */
const jsonifyFriends = (val) => {
    const array_val = [];
    for (const elem_val of val) {
        array_val.push(elem_val);
    }
    return array_val;
};
exports.jsonifyFriends = jsonifyFriends;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mcmllbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGtFQUFrRTtBQUMzRCxNQUFNLFlBQVksR0FBRyxDQUFDLElBQWEsRUFBVyxFQUFFO0lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLEtBQUssQ0FBQyxpQkFBaUIsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sVUFBVSxHQUFrQixFQUFFLENBQUM7SUFDckMsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRO1lBQy9CLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixPQUFPLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDbkQsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQVZXLFFBQUEsWUFBWSxnQkFVdkI7QUFFRixzQ0FBc0M7QUFDL0IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFZLEVBQVcsRUFBRTtJQUN0RCxNQUFNLFNBQVMsR0FBbUIsRUFBRSxDQUFDO0lBQ3JDLEtBQUssTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO1FBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDMUI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFOVyxRQUFBLGNBQWMsa0JBTXpCIn0=