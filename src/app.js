const express = require("express");
const app = express();
const cors = require('cors')

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const teamRouter = require('./routes/teamRoutes');
const adminRouter = require('./routes/adminRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// middlewares
const errorHandler = require('./middleware/errorHandler')

app.use(cors(
  {
    origin: ['http://localhost:3000', 'http://20.197.4.190/', 'http://technicaportal.istevit.in/', 'https://technicaportal.netlify.app/'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  }
))

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