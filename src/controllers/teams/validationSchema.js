const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  createTeam: Joi.object({
    teamName: Joi.string().required().max(50),
    regNo: Joi.string().required().length(9),
    track: Joi.string().required().max(50),
  }),
  addMember: Joi.object({
    code: Joi.string().required(),
    regNo: Joi.string().required().length(9),
  }),
  removeMember: Joi.object({
    teamId: Joi.objectId().required(),
    memberId: Joi.objectId().required(),
  }),
  getTeamDetails: Joi.object({
    teamId: Joi.objectId().required()
  }),
  updateTeamDetails: Joi.object({
    teamName: Joi.string().max(50),
    track: Joi.string().max(50)
  }),
  getTeamToken: Joi.object({
    teamId: Joi.objectId().required(),
  }),
  deleteTeam: Joi.object({
    teamId: Joi.objectId().required(),
  }),
}