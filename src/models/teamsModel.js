const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
    },
    teamLeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    referralCode: {
      type: String,
    },
    projectName: {
      type: String,
    },
    techStack: [
      {
        type: String,
      },
    ],
    desc: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    fileId: {
      type: String,
    },
    reviewNumber: {
      type: Number,
      enum: [1, 2, 3],
    },
    track: {
      type: String,
    }
  },
  { collection: "HackTeams" }
);

module.exports = mongoose.model("HackTeams", teamSchema);
