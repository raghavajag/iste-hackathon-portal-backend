const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(new ErrorResponse("Access Denied: No token provided", 401))
  }
  try {
    const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById({ _id: tokenDetails._id });
    if (!user) {
      return next(new ErrorResponse("Access Denied: Invalid token", 401))
    }
    req.user = { _id: user._id, role: user.role };
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Access Denied: Invalid token", 401))
  }
};

module.exports = auth;
