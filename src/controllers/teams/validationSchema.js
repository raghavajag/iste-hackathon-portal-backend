const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  createTeam: Joi.object({
    teamName: Joi.string().required(),
    projectName: Joi.string().required(),
  }),
  addMember: Joi.object({
    code: Joi.string().required(),
  }),
  removeMember: Joi.object({
    teamId: Joi.objectId().required(),
    memberId: Joi.objectId().required(),
  }),
  getTeamDetails: Joi.object({
    teamId: Joi.objectId().required()
  }),
  updateTeamDetails: Joi.object({
    teamName: Joi.string(),
    projectName: Joi.string(),
    desc: Joi.string().max(500),
  }),
  getTeamToken: Joi.object({
    teamId: Joi.objectId().required(),
  }),
  deleteTeam: Joi.object({
    teamId: Joi.objectId().required(),
  }),
}