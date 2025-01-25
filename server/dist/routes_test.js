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
const httpMocks = __importStar(require("node-mocks-http"));
const campus_1 = require("./campus");
const routes_1 = require("./routes");
const fs_1 = require("fs");
const content = (0, fs_1.readFileSync)("data/campus_edges.csv", {
    encoding: "utf-8",
});
(0, campus_1.parseEdges)(content.split("\n"));
describe("routes", function () {
    it("friends", function () {
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/api/friends",
            query: {},
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.getFriends)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "user" was missing');
        // Request for friends not present already should return empty.
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/api/friends",
            query: { user: "Kevin" },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.getFriends)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), { friends: [] });
        const req3 = httpMocks.createRequest({
            method: "POST",
            url: "/api/friends",
            body: {},
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.setFriends)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'missing or invalid "user" in POST body');
        const req4 = httpMocks.createRequest({
            method: "POST",
            url: "/api/friends",
            body: { user: "Kevin" },
        });
        const res4 = httpMocks.createResponse();
        (0, routes_1.setFriends)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 400);
        assert.deepStrictEqual(res4._getData(), 'missing "friends" in POST body');
        // Set the friends list to have multiple people on it.
        const req5 = httpMocks.createRequest({
            method: "POST",
            url: "/api/friends",
            body: { user: "Kevin", friends: ["James", "Zach", "Anjali"] },
        });
        const res5 = httpMocks.createResponse();
        (0, routes_1.setFriends)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { saved: true });
        // Get friends list again to make sure it was saved.
        const req6 = httpMocks.createRequest({
            method: "GET",
            url: "/api/friends",
            query: { user: "Kevin" },
        });
        const res6 = httpMocks.createResponse();
        (0, routes_1.getFriends)(req6, res6);
        assert.deepStrictEqual(res6._getStatusCode(), 200);
        assert.deepStrictEqual(res6._getData(), {
            friends: ["James", "Zach", "Anjali"],
        });
        (0, routes_1.clearDataForTesting)();
    });
    it("schedule", function () {
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/api/schedule",
            query: {},
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.getSchedule)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "user" was missing');
        // Request for schedule not present already should return empty.
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/api/schedule",
            query: { user: "Kevin" },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.getSchedule)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), { schedule: [] });
        const req3 = httpMocks.createRequest({
            method: "POST",
            url: "/api/schedule",
            body: {},
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.setSchedule)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'missing or invalid "user" in POST body');
        const req4 = httpMocks.createRequest({
            method: "POST",
            url: "/api/schedule",
            body: { user: "Kevin" },
        });
        const res4 = httpMocks.createResponse();
        (0, routes_1.setSchedule)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 400);
        assert.deepStrictEqual(res4._getData(), 'missing "schedule" in POST body');
        // Set the schedule to have two people on it.
        const req5 = httpMocks.createRequest({
            method: "POST",
            url: "/api/schedule",
            body: {
                user: "Kevin",
                schedule: [
                    { hour: "9:30", location: "MLR", desc: "GREEK 101" },
                    { hour: "10:30", location: "CS2", desc: "CSE 989" },
                    { hour: "11:30", location: "HUB", desc: "nom nom" },
                ],
            },
        });
        const res5 = httpMocks.createResponse();
        (0, routes_1.setSchedule)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { saved: true });
        // Get schedule again to make sure it was saved.
        const req6 = httpMocks.createRequest({
            method: "GET",
            url: "/api/schedule",
            query: { user: "Kevin" },
        });
        const res6 = httpMocks.createResponse();
        (0, routes_1.getSchedule)(req6, res6);
        assert.deepStrictEqual(res6._getStatusCode(), 200);
        assert.deepStrictEqual(res6._getData(), {
            schedule: [
                { hour: "9:30", location: "MLR", desc: "GREEK 101" },
                { hour: "10:30", location: "CS2", desc: "CSE 989" },
                { hour: "11:30", location: "HUB", desc: "nom nom" },
            ],
        });
        (0, routes_1.clearDataForTesting)();
    });
    it("getBuildings", function () {
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/api/buildings",
            query: {},
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.getBuildings)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        assert.deepStrictEqual(res1._getData(), { buildings: campus_1.BUILDINGS });
    });
    it("getShortestPath", function () {
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/api/shortestPath",
            query: {},
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.getShortestPath)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "user" was missing');
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/api/shortestPath",
            query: { user: "Kevin" },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.getShortestPath)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'required argument "hour" was missing');
        const req3 = httpMocks.createRequest({
            method: "GET",
            url: "/api/shortestPath",
            query: { user: "Kevin", hour: "9:30" },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.getShortestPath)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), "user has no saved schedule");
        const req4 = httpMocks.createRequest({
            method: "POST",
            url: "/api/schedule",
            body: {
                user: "Kevin",
                schedule: [
                    { hour: "9:30", location: "MLR", desc: "GREEK 101" },
                    { hour: "10:30", location: "CSE", desc: "CSE 989" },
                    { hour: "11:30", location: "HUB", desc: "nom nom" },
                ],
            },
        });
        const res4 = httpMocks.createResponse();
        (0, routes_1.setSchedule)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 200);
        assert.deepStrictEqual(res4._getData(), { saved: true });
        const req5 = httpMocks.createRequest({
            method: "GET",
            url: "/api/shortestPath",
            query: { user: "Kevin", hour: "8:30" },
        });
        const res5 = httpMocks.createResponse();
        (0, routes_1.getShortestPath)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 400);
        assert.deepStrictEqual(res5._getData(), "user has no event starting at this hour");
        const req6 = httpMocks.createRequest({
            method: "GET",
            url: "/api/shortestPath",
            query: { user: "Kevin", hour: "9:30" },
        });
        const res6 = httpMocks.createResponse();
        (0, routes_1.getShortestPath)(req6, res6);
        assert.deepStrictEqual(res6._getStatusCode(), 400);
        assert.deepStrictEqual(res6._getData(), "user is not walking between classes at this hour");
        const req7 = httpMocks.createRequest({
            method: "GET",
            url: "/api/shortestPath",
            query: { user: "Kevin", hour: "10:30" },
        });
        const res7 = httpMocks.createResponse();
        (0, routes_1.getShortestPath)(req7, res7);
        assert.deepStrictEqual(res7._getStatusCode(), 200);
        assert.deepStrictEqual(res7._getData().found, true);
        assert.deepStrictEqual(res7._getData().path.length > 0, true);
        assert.deepStrictEqual(res7._getData().nearby, []);
        // Add friend for Kevin
        const req8 = httpMocks.createRequest({
            method: "POST",
            url: "/api/friends",
            body: { user: "Kevin", friends: ["Adam", "Ali", "Edison"] },
        });
        const res8 = httpMocks.createResponse();
        (0, routes_1.setFriends)(req8, res8);
        assert.deepStrictEqual(res8._getStatusCode(), 200);
        // Check if they are added
        const req9 = httpMocks.createRequest({
            method: "GET",
            url: "/api/friends",
            query: { user: "Kevin" },
        });
        const res9 = httpMocks.createResponse();
        (0, routes_1.getFriends)(req9, res9);
        assert.deepStrictEqual(res9._getStatusCode(), 200);
        assert.deepStrictEqual(res9._getData(), {
            friends: ["Adam", "Ali", "Edison"],
        });
        // Add Schedule for James, Anjali
        const req10_1 = httpMocks.createRequest({
            method: "POST",
            url: "/api/schedule",
            body: {
                user: "Adam",
                schedule: [
                    { hour: "9:30", location: "MLR", desc: "GREEK 101" },
                    { hour: "10:30", location: "CS2", desc: "CSE 333" },
                ],
            },
        });
        const res10_1 = httpMocks.createResponse();
        (0, routes_1.setSchedule)(req10_1, res10_1);
        assert.deepStrictEqual(res10_1._getStatusCode(), 200);
        assert.deepStrictEqual(res10_1._getData(), { saved: true });
        const req10_2 = httpMocks.createRequest({
            method: "POST",
            url: "/api/schedule",
            body: {
                user: "Ali",
                schedule: [
                    { hour: "11:30", location: "KNE", desc: "SOC 240" },
                    { hour: "12:30", location: "CMU", desc: "SOC 316" },
                    { hour: "1:30", location: "BAG", desc: "CSSS 508" },
                    { hour: "3:30", location: "SAV", desc: "CSE 311" },
                ],
            },
        });
        const res10_2 = httpMocks.createResponse();
        (0, routes_1.setSchedule)(req10_2, res10_2);
        assert.deepStrictEqual(res10_2._getStatusCode(), 200);
        assert.deepStrictEqual(res10_2._getData(), { saved: true });
        //Make sure they also add Kevin
        const req11_1 = httpMocks.createRequest({
            method: "POST",
            url: "/api/friends",
            body: { user: "Adam", friends: ["Kevin"] },
        });
        const res11_1 = httpMocks.createResponse();
        (0, routes_1.setFriends)(req11_1, res11_1);
        assert.deepStrictEqual(res11_1._getStatusCode(), 200);
        const req11_2 = httpMocks.createRequest({
            method: "POST",
            url: "/api/friends",
            body: { user: "Ali", friends: ["Kevin", "Edison"] },
        });
        const res11_2 = httpMocks.createResponse();
        (0, routes_1.setFriends)(req11_2, res11_2);
        assert.deepStrictEqual(res11_2._getStatusCode(), 200);
        const req11_3 = httpMocks.createRequest({
            method: "POST",
            url: "/api/friends",
            body: { user: "Edison", friends: ["Kevin", "Ali"] },
        });
        const res11_3 = httpMocks.createResponse();
        (0, routes_1.setFriends)(req11_3, res11_3);
        assert.deepStrictEqual(res11_3._getStatusCode(), 200);
        // Check if nearby is correctly returned
        const req12 = httpMocks.createRequest({
            method: "GET",
            url: "/api/shortestPath",
            query: { user: "Kevin", hour: "10:30" },
        });
        const res12 = httpMocks.createResponse();
        (0, routes_1.getShortestPath)(req12, res12);
        assert.deepStrictEqual(res12._getStatusCode(), 200);
        const data = res12._getData();
        assert.deepStrictEqual(data.nearby[0].friend, "Adam");
        assert.deepStrictEqual(data.nearby[0].dist, 0);
        assert.deepStrictEqual(data.nearby[0].loc, {
            x: 2184.7074,
            y: 1045.0386,
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQWlEO0FBQ2pELHFDQVFrQjtBQUNsQiwyQkFBa0M7QUFFbEMsTUFBTSxPQUFPLEdBQVcsSUFBQSxpQkFBWSxFQUFDLHVCQUF1QixFQUFFO0lBQzVELFFBQVEsRUFBRSxPQUFPO0NBQ2xCLENBQUMsQ0FBQztBQUNILElBQUEsbUJBQVUsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFFaEMsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUNqQixFQUFFLENBQUMsU0FBUyxFQUFFO1FBQ1osTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRSxjQUFjO1lBQ25CLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsbUJBQVUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGVBQWUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLHNDQUFzQyxDQUN2QyxDQUFDO1FBRUYsK0RBQStEO1FBQy9ELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsY0FBYztZQUNuQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1NBQ3pCLENBQUMsQ0FBQztRQUNI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