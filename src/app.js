const express = require("express");
const app = express();
app.use(express.json());

app.get("/heartbeat", function (req, res) {
  res.status(200).json({
    message: "Success.",
  });
});

module.exports = app;