const express = require("express");
const teamController = require("../controllers/teams/teamController");
const teamRouter = express.Router();
const asyncHandler = require('../middleware/async')
const auth = require('../middleware/authMiddleware')

teamRouter.post("/", auth, asyncHandler(teamController.createTeam));
teamRouter.get("/", auth, asyncHandler(teamController.getTeams));
teamRouter.post("/members", auth, asyncHandler(teamController.addMember));
teamRouter.delete("/members/:memberId/:teamId", auth, asyncHandler(teamController.removeMember));
module.exports = teamRouter;