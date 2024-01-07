const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HackTeams',
    required: true,
  },

  githubLink: {
    type: String,
  },
  figmaLink: {
    type: String,
  },
  otherLink: {
    type: String,
  },
  ideaDescription: {
    type: String,
  },

  rating: {
    type: Number,
  },
  comments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviewNumber: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  fileUrl: {
    type: String,
  },
  progressSinceReviewOne: {
    type: String,
  },
  prograssSinceReviewTwo: {
    type: String,
  },
  deployedLink: {
    type: String,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
