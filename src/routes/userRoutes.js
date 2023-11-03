const express = require("express");
const userController = require("../controllers/user/userController");
const userRouter = express.Router();
const auth = require("../middleware/authMiddleware");

userRouter.get("/", auth, userController.getDetails)

module.exports = userRouter;