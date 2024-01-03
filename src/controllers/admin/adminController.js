const Teams = require("../../models/teamsModel");
const { Response } = require('../../utils/response');

exports.getTeams = async (req, res, next) => {
  const teams = await Teams.find();
  return new Response("Teams", teams, 200);
}
exports.getTeam = async (req, res, next) => {
  const team = await Teams.findById(req.params.id).populate('members');
  return new Response("Team", team, 200);
}
exports.deleteTeam = async (req, res, next) => {
  await Teams.findByIdAndDelete(req.params.id);
  return new Response("Team deleted", {}, 200);
}
exports.enableReview = async (req, res, next) => {
  const { reviewNumber } = req.params;
  await Teams.updateMany({}, { reviewNumber })
  return new Response(`Review ${reviewNumber} enabled`, {}, 200);
} 
