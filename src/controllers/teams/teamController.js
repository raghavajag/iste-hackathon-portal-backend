const Teams = require("../../models/teamsModel");
const ErrorResponse = require("../../utils/errorResponse");
const uuid = require("uuid");

exports.createTeam = async (req, res, next) => {
  const { teamName, projectName } = req.body;
  const team = await Teams.findOne({ teamName })
  if (team) {
    return next(new ErrorResponse("Team already exists", 400))
  }
  const referralCode = uuid.v4();

  await new Teams({
    teamName,
    projectName,
    teamLeaderId: req.user._id,
    members: [req.user._id],
    referralCode
  }).save();

  return res.json({ success: true, message: "Team created successfully", data: { code: referralCode } })
}
exports.getTeams = async (req, res, next) => {
  const teams = await Teams.find({}).populate('teamLeaderId', 'name email')
  return res.json({ success: true, teams })
}
exports.addMember = async (req, res, next) => {
  const { code } = req.body
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

  return res.json({ success: true, message: "Member added to the team successfully" });
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

  return res.json({ success: true, message: "Member removed from the team successfully" });
}