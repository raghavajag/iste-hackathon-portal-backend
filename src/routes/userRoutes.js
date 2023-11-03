const express = require("express");
const userController = require("../controllers/user/userController");
const userRouter = express.Router();
const auth = require("../middleware/authMiddleware");
const asyncHandler = require('../middleware/async')

userRouter.get("/", auth, asyncHandler(userController.getDetails))

module.exports = userRouter;