const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    next(new ErrorResponse("Access Denied: No token provided", 401))
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById({ _id: tokenDetails._id });
    if (!user) {
      next(new ErrorResponse("Access Denied: Invalid token", 401))
    }
    req.user = { _id: user._id };
    next();
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("Access Denied: Invalid token", 401))
  }
};

module.exports = auth;
