"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = require("fs");
const campus_1 = require("./campus");
const routes_1 = require("./routes");
// Parse the information about the walkways on campus.
const content = (0, fs_1.readFileSync)("data/campus_edges.csv", { encoding: 'utf-8' });
(0, campus_1.parseEdges)(content.split("\n"));
// Configure and start the HTTP server.
const port = 8088;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/api/buildings", routes_1.getBuildings);
app.get("/api/friends", routes_1.getFriends);
app.post("/api/friends", routes_1.setFriends);
app.get("/api/schedule", routes_1.getSchedule);
app.post("/api/schedule", routes_1.setSchedule);
app.get("/api/shortestPath", routes_1.getShortestPath);
app.listen(port, () => console.log(`Server listening on ${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBMkM7QUFDM0MsOERBQXFDO0FBQ3JDLDJCQUFrQztBQUNsQyxxQ0FBc0M7QUFDdEMscUNBR29CO0FBR3BCLHNEQUFzRDtBQUN0RCxNQUFNLE9BQU8sR0FBVyxJQUFBLGlCQUFZLEVBQUMsdUJBQXVCLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztBQUNuRixJQUFBLG1CQUFVLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBR2hDLHVDQUF1QztBQUN2QyxNQUFNLElBQUksR0FBVyxJQUFJLENBQUM7QUFDMUIsTUFBTSxHQUFHLEdBQVksSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxxQkFBWSxDQUFDLENBQUM7QUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsbUJBQVUsQ0FBQyxDQUFDO0FBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLG1CQUFVLENBQUMsQ0FBQztBQUNyQyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxvQkFBVyxDQUFDLENBQUM7QUFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsb0JBQVcsQ0FBQyxDQUFDO0FBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsd0JBQWUsQ0FBQyxDQUFDO0FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyJ9