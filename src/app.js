const express = require("express");
const app = express();

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/heartbeat", function (req, res) {
  res.status(200).json({
    message: "Success.",
  });
});

module.exports = app;