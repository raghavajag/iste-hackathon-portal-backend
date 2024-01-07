const Teams = require("../../models/teamsModel");
const ErrorResponse = require("../../utils/ErrorResponse");
const uuid = require("uuid");
const { Response } = require('../../utils/response');
const User = require('../../models/userModel')

exports.createTeam = async (req, res, next) => {
  const { teamName, regNo, track } = req.body;
  const team = await Teams.findOne({ teamName })
  if (team) {
    return next(new ErrorResponse("Team already exists", 400))
  }
  const referralCode = uuid.v4();

  await User.updateOne({ _id: req.user._id }, {
    regNo,
    hasFilledDetails: true
  })

  await new Teams({
    teamName,
    track,
    teamLeaderId: req.user._id,
    members: [req.user._id],
    referralCode
  }).save();

  return new Response("Team Created", { code: referralCode }, 201);
}
exports.getTeams = async (req, res, next) => {
  const teams = await Teams.find({}).populate('teamLeaderId', 'name email')
  return new Response('Teams', teams, 200)
}
exports.addMember = async (req, res, next) => {
  const { code, regNo } = req.body
  const memberExists = await Teams.findOne({ members: req.user._id })
  if (memberExists) {
    return next(new ErrorResponse("User is already a member of some team", 400));
  }
  const team = await Teams.findOne({ referralCode: code })
  if (!team) {
    return next(new ErrorResponse("Invalid referral code", 400))
  }
  if (team.members.length >= 4) {
    return next(new ErrorResponse("Team is full", 400))
  }
  team.members.push(req.user._id)
  await team.save();
  await User.updateOne({ _id: req.user._id }, { regNo })
  return new Response("Member added to the team successfully", {}, 200);
}
exports.removeMember = async (req, res, next) => {
  const { teamId, memberId } = req.params;
  const team = await Teams.findById(teamId);

  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }

  if (team.teamLeaderId.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("You don't have permission to remove a member", 403));
  }
  if (team.teamLeaderId.toString() === memberId) {
    return next(new ErrorResponse("Team leader cannot be removed", 403));
  }
  if (!team.members.includes(memberId)) {
    return next(new ErrorResponse("Member not found in the team", 404));
  }

  team.members = team.members.filter((member) => member.toString() !== memberId);

  await team.save();

  return new Response("Member removed from the team successfully", {}, 200);
}
exports.getTeamDetails = async (req, res, next) => {
  const { teamId } = req.params;
  const team = await Teams.findById(teamId).populate('teamLeaderId', 'name email').populate('members', 'name email')
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  return new Response('Team Details', team, 200)
}
exports.updateTeamDetails = async (req, res, next) => {
  const { teamId } = req.params;
  const { teamName, track } = req.body;
  const team = await Teams.findById(teamId);
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.teamLeaderId.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("You don't have permission to update the team details", 403));
  }
  if (teamName) {
    const teamExists = await Teams.findOne({ teamName })
    if (teamExists && teamExists._id.toString() !== team._id.toString()) {
      return next(new ErrorResponse("Team name already exists", 400));
    }
  }
  if (track != team.track) {
    team.track = track;
  }
  team.teamName = teamName;
  await team.save();
  return new Response('Team Details Updated', team, 200)
}
exports.deleteTeam = async (req, res, next) => {
  const team = await Teams.findById(req.params.teamId)
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.teamLeaderId.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("You don't have permission to delete the team", 403));
  }
  await team.remove();
  return new Response('Team Deleted', {}, 200)
}

exports.getTeamToken = async (req, res, next) => {
  const team = await Teams.findById(req.params.teamId)
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.teamLeaderId.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("You don't have permission to get the team token", 403));
  }
  return new Response('Team Token', { token: team.referralCode }, 200)
}
exports.createNewReferralCode = async (req, res, next) => {
  const team = await Teams.findById(req.params.teamId)
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.teamLeaderId.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("You don't have permission to get the team token", 403));
  }
  team.referralCode = uuid.v4();
  await team.save();
  return new Response('Team Token', { token: team.referralCode }, 200)
}