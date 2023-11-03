const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Access Denied: No token provided" })
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById({ _id: tokenDetails._id });
    if (!user) {
      return res.json({ success: false, message: "Invalid username or password" })
    }
    req.user = { _id: user._id, username: user.username };
    next();
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Invalid username or password" })
  }
};

module.exports = auth;
