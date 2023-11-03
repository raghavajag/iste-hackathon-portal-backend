const express = require("express");
const app = express();

// Routes
const authRouter = require("./routes/authRoutes");

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/heartbeat", function (req, res) {
  res.status(200).json({
    message: "Success.",
  });
});

module.exports = app;