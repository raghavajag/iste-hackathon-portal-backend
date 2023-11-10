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
        type: Number,
      },
    ],
    youtubeUrl: {
      type: String,
    },
    desc: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    fileId: {
      type: String,
    },
  },
  { collection: "HackTeams" }
);

module.exports = mongoose.model("HackTeams", teamSchema);
