const express = require("express");
const app = express();

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const teamRouter = require('./routes/teamRoutes');
const adminRouter = require('./routes/adminRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// middlewares
const errorHandler = require('./middleware/errorHandler')

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/teams", teamRouter);
app.use("/api/admin", adminRouter);
app.use("/api/reviews", reviewRouter);

app.get("/heartbeat", function (req, res) {
  res.status(200).json({
    message: "Success.",
  });
});

app.use(errorHandler)
module.exports = app;