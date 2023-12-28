const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  signUp: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }),
  singIn: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  googleLogin: Joi.object({
    token: Joi.string().required(),
  })
}