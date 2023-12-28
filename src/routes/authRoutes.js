const express = require("express");
const authController = require("../controllers/auth/authController");
const authRouter = express.Router();
const asyncHandler = require('../middleware/async')
const validate = require('../middleware/validate')
const { signUp, singIn, googleLogin } = require('../controllers/auth/validationSchema')

authRouter.post("/register", validate.body(signUp), asyncHandler(authController.basicAuthSignUp));
authRouter.post("/login", validate.body(singIn), asyncHandler(authController.basicAuthLogIn));
authRouter.post("/google", validate.body(googleLogin), asyncHandler(authController.googleAuth));

module.exports = authRouter;
