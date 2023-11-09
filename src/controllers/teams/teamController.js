const Teams = require("../../models/hackTeams");
const ErrorResponse = require("../../utils/errorResponse");

exports.createTeam = async (req, res, next) => {
  const { teamName, projectName } = req.body;
  const team = await Teams.findOne({ teamName })
  if (team) {
    return next(new ErrorResponse("Team already exists", 400))
  }
  await new Teams({
    teamName,
    projectName,
    teamLeaderId: req.user._id
  }).save();

  return res.json({ success: true, message: "Team created successfully" })
}
exports.getTeams = async (req, res, next) => {
  const teams = await Teams.find({}).populate('teamLeaderId', 'name email')
  return res.json({ success: true, teams })
}