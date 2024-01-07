const mongoose = require("mongoose");
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    password: {
      type: String,
      select: false
    },
    email: {
      type: String,
    },
    hasFilledDetails: {
      type: Boolean,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    regNo: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    loginType: {
      type: String,
      enum: ['GOOGLE_LOGIN', 'BASIC_LOGIN'],
      default: 'BASIC_LOGIN'
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    confirmEmailToken: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Users" }
);

// Generate email confirm token
userSchema.methods.generateEmailConfirmToken = function (next) {
  const confirmationToken = crypto.randomBytes(20).toString('hex');

  this.confirmEmailToken = crypto
    .createHash('sha256')
    .update(confirmationToken)
    .digest('hex');

  const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
  const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
  return confirmTokenCombined;
};

module.exports = mongoose.model("Users", userSchema);
