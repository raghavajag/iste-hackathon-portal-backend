const Review = require("../../models/reviewModel");
const Team = require("../../models/teamsModel");
const ErrorResponse = require("../../utils/ErrorResponse");
const { Response } = require('../../utils/response');

exports.createReview = async (req, res, next) => {
  const { teamId } = req.params;
  const { githubLink, figmaLink, otherLink, ideaDescription, reviewNumber } = req.body;
  const team = await Team.findById(teamId);
  if (!team) {
    return next(new ErrorResponse("Team not found", 404));
  }
  if (team.reviewNumber !== reviewNumber) {
    return next(new ErrorResponse("Invalid review number", 400))
  }
  const review = await Review.create({
    teamId,
    githubLink,
    figmaLink,
    otherLink,
    ideaDescription,
    reviewNumber
  })
  return new Response("Review created", review, 201)
}
exports.getReviews = async (req, res, next) => {
  const { teamId } = req.params;
  const reviews = await Review.find({ teamId }).sort({ createdAt: -1 }).select("-__v");
  return new Response("Reviews", reviews, 200)
}