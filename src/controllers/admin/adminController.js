const Teams = require("../../models/teamsModel");

exports.getTeams = async (req, res, next) => {
  const teams = await Teams.find();
  return res.status(200).json({
    success: true,
    data: teams
  });
}
exports.getTeam = async (req, res, next) => {
  const team = await Teams.findById(req.params.id).populate('members');
  return res.status(200).json({
    success: true,
    data: team
  });
}
exports.deleteTeam = async (req, res, next) => {
  await Teams.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    data: {}
  });
}