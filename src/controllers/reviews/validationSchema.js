const Joi = require("joi");
module.exports = {
  createReviewOne: Joi.object({
    githubLink: Joi.string().required(),
    figmaLink: Joi.string().required(),
    otherLink: Joi.string().required(),
    ideaDescription: Joi.string().required(),
  }),
  createReviewTwo: Joi.object({
    githubLink: Joi.string().required(),
    figmaLink: Joi.string().required(),
    deploymentLink: Joi.string().required(), // Added for Review 2 and 3
    otherLink: Joi.string().required(),
    progressSinceReviewOne: Joi.string().required(),
  }),
  createReviewThree: Joi.object({
    githubLink: Joi.string().required(),
    figmaLink: Joi.string().required(),
    deploymentLink: Joi.string().required(), // Added for Review 2 and 3
    otherLink: Joi.string().required(),
    progressSinceReviewTwo: Joi.string().required(),
  })
}