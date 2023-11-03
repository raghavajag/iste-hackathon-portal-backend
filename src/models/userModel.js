const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
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
  },
  { collection: "Users" }
);

module.exports = mongoose.model("Users", userSchema);
