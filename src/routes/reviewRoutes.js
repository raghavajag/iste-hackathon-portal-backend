const express = require("express");
const reviewController = require("../controllers/reviews/reviewController");
const reviewRouter = express.Router();
const asyncHandler = require('../middleware/async')
const auth = require("../middleware/authMiddleware")
const Validate = require("../middleware/validate")
const { createReviewOne, createReviewTwo, createReviewThree } = require('../controllers/reviews/validationSchema')

reviewRouter.post("/:teamId/1", auth, Validate.body(createReviewOne), asyncHandler(reviewController.createReviewOne));
reviewRouter.post("/:teamId/2", auth, Validate.body(createReviewTwo), asyncHandler(reviewController.createReviewTwo));
reviewRouter.post("/:teamId/3", auth, Validate.body(createReviewThree), asyncHandler(reviewController.createReviewThree));
reviewRouter.get("/:teamId", auth, asyncHandler(reviewController.getReviews));

module.exports = reviewRouter;
