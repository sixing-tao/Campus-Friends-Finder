"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortestPath = exports.getBuildings = exports.setSchedule = exports.getSchedule = exports.setFriends = exports.getFriends = exports.clearDataForTesting = void 0;
const campus_1 = require("./campus");
const pathfinder_1 = require("./pathfinder");
const friends_1 = require("./friends");
const schedule_1 = require("./schedule");
const location_tree_1 = require("./location_tree");
// Map from user names to their lists of friends. Defaults to an empty list.
const allFriends = new Map();
// Map from user names to their schedules. Defaults to an empty schedule.
const allSchedules = new Map();
/** Determines if the first person is in the second person's list of friends. */
const isFriend = (friend, user) => {
    const friends = allFriends.get(user);
    return friends !== undefined && friends.includes(friend);
};
/** Called from the tests to clear out any data stored during the current test. */
const clearDataForTesting = () => {
    allFriends.clear();
    allSchedules.clear();
};
exports.clearDataForTesting = clearDataForTesting;
/** Returns a list of friends of the user. */
const getFriends = (req, res) => {
    const user = first(req.query.user);
    if (user === undefined) {
        res.status(400).send('required argument "user" was missing');
        return;
    }
    const friends = allFriends.get(user);
    if (friends === undefined) {
        res.send({ friends: [] });
    }
    else {
        res.send({ friends: (0, friends_1.jsonifyFriends)(friends) });
    }
};
exports.getFriends = getFriends;
/** Updates a list of friends of the user. */
const setFriends = (req, res) => {
    if (typeof req.body.user !== "string") {
        res.status(400).send('missing or invalid "user" in POST body');
        return;
    }
    if (req.body.friends === undefined) {
        res.status(400).send('missing "friends" in POST body');
        return;
    }
    const friends = (0, friends_1.parseFriends)(req.body.friends);
    allFriends.set(req.body.user, friends);
    res.send({ saved: true });
};
exports.setFriends = setFriends;
/** Returns the schedule of the user. */
const getSchedule = (req, res) => {
    const user = first(req.query.user);
    if (user === undefined) {
        res.status(400).send('required argument "user" was missing');
        return;
    }
    const schedule = allSchedules.get(user);
    if (schedule === undefined) {
        res.send({ schedule: [] });
    }
    else {
        res.send({ schedule: (0, schedule_1.jsonifySchedule)(schedule) });
    }
};
exports.getSchedule = getSchedule;
/** Updates the schedule of the user. */
const setSchedule = (req, res) => {
    if (typeof req.body.user !== "string") {
        res.status(400).send('missing or invalid "user" in POST body');
        return;
    }
    if (req.body.schedule === undefined) {
        res.status(400).send('missing "schedule" in POST body');
        return;
    }
    const schedule = (0, schedule_1.parseSchedule)(req.body.schedule);
    allSchedules.set(req.body.user, schedule);
    res.send({ saved: true });
};
exports.setSchedule = setSchedule;
/** Returns a list of all known buildings. */
const getBuildings = (_req, res) => {
    res.send({ buildings: campus_1.BUILDINGS });
};
exports.getBuildings = getBuildings;
/** Returns a list of all known buildings. */
const getShortestPath = (req, res) => {
    const user = first(req.query.user);
    if (user === undefined) {
        res.status(400).send('required argument "user" was missing');
        return;
    }
    const hourStr = first(req.query.hour);
    if (hourStr === undefined) {
        res.status(400).send('required argument "hour" was missing');
        return;
    }
    const schedule = allSchedules.get(user);
    if (schedule === undefined) {
        res.status(400).send("user has no saved schedule");
        return;
    }
    const hour = (0, schedule_1.parseHour)(hourStr);
    const index = (0, schedule_1.indexAtHour)(schedule, hour);
    if (index < 0) {
        res.status(400).send("user has no event starting at this hour");
        return;
    }
    else if (index === 0) {
        res.status(400).send("user is not walking between classes at this hour");
        return;
    }
    // Find the shortest path for this user's walk at this time.
    const start = (0, campus_1.getBuildingByShortName)(schedule[index - 1].location);
    const end = (0, campus_1.getBuildingByShortName)(schedule[index].location);
    const path = (0, pathfinder_1.findPath)(start.location, end.location, campus_1.EDGES);
    if (!path) {
        res.send({ found: false });
        return;
    }
    const nearby = [];
    // For any friends that are also walking at this time, record the closest
    // point on this user's path to any point on their walk in the nearby list.
    const friends = allFriends.get(user);
    if (friends !== undefined) {
        // Record all of the locations on the user's walk. (Will be useful later.)
        const locs = (0, campus_1.locationsOnPath)(path.steps);
        for (const friend of friends) {
            if (!isFriend(user, friend))
                // require both to mark as friends
                continue;
            // Get the friend's schedule. (Can skip them if they don't have one.)
            const fSched = allSchedules.get(friend);
            if (fSched === undefined)
                continue;
            // See if they walk at this hour. (Can skip them if not.)
            const fIndex = (0, schedule_1.indexAtHour)(fSched, hour);
            if (fIndex <= 0)
                continue;
            const fStart = (0, campus_1.getBuildingByShortName)(fSched[fIndex - 1].location);
            const fEnd = (0, campus_1.getBuildingByShortName)(fSched[fIndex].location);
            // Find all the points on the friend's walk.
            const fPath = (0, pathfinder_1.findPath)(fStart.location, fEnd.location, campus_1.EDGES);
            if (!fPath)
                continue;
            const fLocs = (0, campus_1.locationsOnPath)(fPath.steps);
            // Build a tree for the friend's locations.
            const fTree = (0, location_tree_1.buildTree)(locs);
            // Find the closest point on the friend's path to any point on the user's path.
            const [closestLoc, closestDist] = (0, location_tree_1.findClosestInTree)(fTree, fLocs);
            if (closestDist <= 300) {
                nearby.push({
                    friend: friend,
                    dist: closestDist,
                    loc: closestLoc,
                });
            }
        }
    }
    res.send({ found: true, path: path.steps, nearby });
};
exports.getShortestPath = getShortestPath;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === "string") {
        return param;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FLa0I7QUFDbEIsNkNBQXdDO0FBQ3hDLHVDQUFrRTtBQUNsRSx5Q0FNb0I7QUFFcEIsbURBQStEO0FBTS9ELDRFQUE0RTtBQUM1RSxNQUFNLFVBQVUsR0FBeUIsSUFBSSxHQUFHLEVBQW1CLENBQUM7QUFFcEUseUVBQXlFO0FBQ3pFLE1BQU0sWUFBWSxHQUEwQixJQUFJLEdBQUcsRUFBb0IsQ0FBQztBQUV4RSxnRkFBZ0Y7QUFDaEYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFjLEVBQUUsSUFBWSxFQUFXLEVBQUU7SUFDekQsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxPQUFPLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFFRixrRkFBa0Y7QUFDM0UsTUFBTSxtQkFBbUIsR0FBRyxHQUFTLEVBQUU7SUFDNUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUM7QUFIVyxRQUFBLG1CQUFtQix1QkFHOUI7QUFFRiw2Q0FBNkM7QUFDdEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUN0RSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUM3RCxPQUFPO0tBQ1I7SUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFV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