const express = require("express");
const authController = require("../controllers/auth/authController");
const authRouter = express.Router();
const asyncHandler = require('../middleware/async')

authRouter.post("/register", asyncHandler(authController.basicAuthSignUp));
authRouter.post("/login", asyncHandler(authController.basicAuthLogIn));
authRouter.post("/google", asyncHandler(authController.googleAuth));

module.exports = authRouter;
