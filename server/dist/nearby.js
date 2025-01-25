"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonifyNearby = exports.parseNearby = exports.jsonifyLocation = exports.parseLocation = void 0;
const record_1 = require("./record");
/**
 * Creates a Location object using given data, if data is properly formed
 * as a record containing all Location fields
 * @param data to parse
 * @returns Location object created using data
 */
const parseLocation = (data) => {
    if (!(0, record_1.isRecord)(data))
        throw new Error(`not a record: ${typeof data}`);
    if (typeof data.kind !== "string")
        throw new Error(`kind is not string: ${typeof data.kind}`);
    const x = data.x;
    if (typeof x !== "number")
        throw Error(`not a number: ${typeof x}`);
    const y = data.y;
    if (typeof y !== "number")
        throw Error(`not a number: ${typeof y}`);
    return { x: x, y: y };
};
exports.parseLocation = parseLocation;
/**
 * Creates a JSON object with the values from given Location
 * @param val Location data to convert to JSON
 * @returns JSON object created
 */
const jsonifyLocation = (val) => {
    const x = val.x;
    const y = val.y;
    return { x: x, y: y };
};
exports.jsonifyLocation = jsonifyLocation;
/**
 * Creates a Nearby object using given data, if data is properly formed
 * as a record containing all Nearby fields
 * @param data to parse
 * @returns Nearby object created using data
 */
const parseNearby = (data) => {
    if (!(0, record_1.isRecord)(data))
        throw new Error(`not a record: ${typeof data}`);
    if (typeof data.kind !== "string")
        throw new Error(`kind is not string: ${typeof data.kind}`);
    const loc = data.loc;
    const parsed_loc = (0, exports.parseLocation)(loc);
    const friend = data.friend;
    if (typeof friend !== "string")
        throw Error(`not a string: ${typeof friend}`);
    const dist = data.dist;
    if (typeof dist !== "number")
        throw Error(`not a number: ${typeof dist}`);
    return { loc: parsed_loc, friend: friend, dist: dist };
};
exports.parseNearby = parseNearby;
/**
 * Creates a JSON object with the values from given Nearby
 * @param val Nearby data to convert to JSON
 * @returns JSON object created
 */
const jsonifyNearby = (val) => {
    const loc = val.loc;
    const jsonified_loc = (0, exports.jsonifyLocation)(loc);
    const friend = val.friend;
    const dist = val.dist;
    return { loc: jsonified_loc, friend: friend, dist: dist };
};
exports.jsonifyNearby = jsonifyNearby;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVhcmJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25lYXJieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBb0M7QUFVcEM7Ozs7O0dBS0c7QUFDSSxNQUFNLGFBQWEsR0FBRyxDQUFDLElBQWEsRUFBWSxFQUFFO0lBQ3ZELElBQUksQ0FBQyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFN0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7UUFDdkIsTUFBTSxLQUFLLENBQUMsaUJBQWlCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUUzQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtRQUN2QixNQUFNLEtBQUssQ0FBQyxpQkFBaUIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNDLE9BQU8sRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQTtBQUNyQixDQUFDLENBQUM7QUFmVyxRQUFBLGFBQWEsaUJBZXhCO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBYSxFQUFXLEVBQUU7SUFDeEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLE9BQU8sRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztBQUN0QixDQUFDLENBQUM7QUFKVyxRQUFBLGVBQWUsbUJBSTFCO0FBRUY7Ozs7O0dBS0c7QUFDSSxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQWEsRUFBVSxFQUFFO0lBQ25ELElBQUksQ0FBQyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFN0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFDNUIsTUFBTSxLQUFLLENBQUMsaUJBQWlCLE9BQU8sTUFBTSxFQUFFLENBQUMsQ0FBQztJQUVoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUMxQixNQUFNLEtBQUssQ0FBQyxpQkFBaUIsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLE9BQU8sRUFBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFBO0FBQ3RELENBQUMsQ0FBQztBQWxCVyxRQUFBLFdBQVcsZUFrQnRCO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBVyxFQUFXLEVBQUU7SUFDcEQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUNwQixNQUFNLGFBQWEsR0FBRyxJQUFBLHVCQUFlLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUMxQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3RCLE9BQU8sRUFBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFBO0FBQ3pELENBQUMsQ0FBQztBQU5XLFFBQUEsYUFBYSxpQkFNeEIifQ==