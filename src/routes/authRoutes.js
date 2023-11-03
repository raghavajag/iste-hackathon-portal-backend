const express = require("express");
const authController = require("../controllers/auth/authController");
const authRouter = express.Router();

authRouter.route("/register").post(authController.basicAuthSignUp);
authRouter.route("/login").post(authController.basicAuthLogIn);
authRouter.route("/google").post(authController.googleAuth);
module.exports = authRouter;
