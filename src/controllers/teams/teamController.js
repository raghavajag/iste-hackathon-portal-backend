const Teams = require("../../models/hackTeams");
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
    referralCode
  }).save();

  return res.json({ success: true, message: "Team created successfully", data: { code: referralCode } })
}
exports.getTeams = async (req, res, next) => {
  const teams = await Teams.find({}).populate('teamLeaderId', 'name email')
  return res.json({ success: true, teams })
}