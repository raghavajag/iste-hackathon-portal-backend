const Review = require("../../models/reviewModel");
const Team = require("../../models/teamsModel");
const ErrorResponse = require("../../utils/errorResponse");

exports.createReview = async (req, res, next) => {
  const { teamId, githubLink, figmaLink, otherLink, ideaDescription, reviewNumber } = req.body;
  const team = await Team.findById(teamId);
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
  return res.json({
    success: true,
    data: review
  })
}
exports.getReviews = async (req, res, next) => {
  const { teamId } = req.params;
  const reviews = await Review.find({ teamId }).sort({ createdAt: -1 });
  return res.json({
    success: true,
    data: reviews
  })
}