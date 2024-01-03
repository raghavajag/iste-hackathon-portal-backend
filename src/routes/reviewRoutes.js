const express = require("express");
const reviewController = require("../controllers/reviews/reviewController");
const reviewRouter = express.Router();
const asyncHandler = require('../middleware/async')
const auth = require("../middleware/authMiddleware")

reviewRouter.post("/:teamId", auth, asyncHandler(reviewController.createReview));
reviewRouter.get("/:teamId", auth, asyncHandler(reviewController.getReviews));

module.exports = reviewRouter;
