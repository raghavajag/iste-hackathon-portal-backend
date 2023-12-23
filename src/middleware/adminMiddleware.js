const auth = require("./authMiddleware");
const ErrorResponse = require("../utils/ErrorResponse");

const adminAuth = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return next(new ErrorResponse("Access Denied: Admin permissions required", 403));
    }

    next();
  } catch (error) {
    console.error("Error in adminAuth middleware:", error);
    return res.status(500).json({ success: false, errors: [{ message: "Internal server error" }] });
  }
};

module.exports = adminAuth;