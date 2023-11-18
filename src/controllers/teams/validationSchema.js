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
    teamId: Joi.objectId().required(),
    teamName: Joi.string().required(),
    projectName: Joi.string().required(),
  }),
  getTeamToken: Joi.object({
    teamId: Joi.objectId().required(),
  }),
  deleteTeam: Joi.object({
    teamId: Joi.objectId().required(),
  }),
}