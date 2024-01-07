const Review = require("../../models/reviewModel");
const Team = require("../../models/teamsModel");
const ErrorResponse = require("../../utils/ErrorResponse");
const { Response } = require('../../utils/response');

exports.createReviewOne = async (req, res, next) => {
  const { teamId } = req.params;
  const { githubLink, figmaLink, otherLink, ideaDescription } = req.body;
  const team = await Team.findById(teamId);
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.reviewNumber !== 1) {
    return next(new ErrorResponse("Invalid review number", 400))
  }
  const review = await new Review({
    teamId,
    githubLink,
    figmaLink,
    otherLink,
    ideaDescription,
    reviewNumber: 1,
  }).save();
  return new Response("Review created", review, 201)
}
exports.createReviewTwo = async (req, res, next) => {
  const { teamId } = req.params;
  const { githubLink, figmaLink, otherLink, progressSinceReviewOne, deploymentLink } = req.body;
  const team = await Team.findById(teamId);
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.reviewNumber !== 2) {
    return next(new ErrorResponse("Invalid review number", 400))
  }
  const review = await new Review({
    teamId,
    githubLink,
    figmaLink,
    otherLink,
    progressSinceReviewOne,
    deploymentLink,
    reviewNumber: 2,
  }).save();
  return new Response("Review created", review, 201)
}
exports.createReviewThree = async (req, res, next) => {
  const { teamId } = req.params;
  const { githubLink, figmaLink, otherLink, progressSinceReviewTwo, deploymentLink } = req.body;
  const team = await Team.findById(teamId);
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.reviewNumber !== 3) {
    return next(new ErrorResponse("Invalid review number", 400))
  }
  const review = await new Review({
    teamId,
    githubLink,
    figmaLink,
    otherLink,
    progressSinceReviewTwo,
    deploymentLink,
    reviewNumber: 3,
  }).save();
  return new Response("Review created", review, 201)
}

exports.getReviews = async (req, res, next) => {
  const { teamId } = req.params;
  const reviews = await Review.find({ teamId }).sort({ createdAt: -1 }).select("-__v");
  return new Response("Reviews", reviews, 200)
}