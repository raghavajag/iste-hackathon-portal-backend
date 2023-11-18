const express = require("express");
const teamController = require("../controllers/teams/teamController");
const teamRouter = express.Router();
const asyncHandler = require('../middleware/async')
const auth = require('../middleware/authMiddleware')
const validate = require('../middleware/validate')
const { createTeam, addMember, removeMember, getTeamDetails, getTeamToken, deleteTeam, updateTeamDetails } = require("../controllers/teams/validationSchema")

teamRouter.post("/", auth, validate.body(createTeam), asyncHandler(teamController.createTeam));
teamRouter.get("/", auth, asyncHandler(teamController.getTeams));
teamRouter.post("/members", auth, validate.body(addMember), asyncHandler(teamController.addMember));
teamRouter.delete("/members/:memberId/:teamId", auth, validate.params(removeMember), asyncHandler(teamController.removeMember));
teamRouter.get("/:teamId", auth, validate.params(getTeamDetails), asyncHandler(teamController.getTeamDetails))
teamRouter.patch("/:teamId", auth, validate.params(updateTeamDetails), asyncHandler(teamController.updateTeamDetails))
teamRouter.get("/token/:teamId", auth, validate.params(getTeamToken), asyncHandler(teamController.getTeamToken))
teamRouter.delete("/:teamId", auth, validate.params(deleteTeam), asyncHandler(teamController.deleteTeam))
module.exports = teamRouter;