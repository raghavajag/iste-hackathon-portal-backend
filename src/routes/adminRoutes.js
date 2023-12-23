const express = require("express");
const adminController = require("../controllers/admin/adminController");
const adminRouter = express.Router();
const asyncHandler = require('../middleware/async')
const adminAuth = require("../middleware/adminMiddleware");
const userAuth = require("../middleware/authMiddleware");

adminRouter.get("/teams", userAuth, adminAuth, asyncHandler(adminController.getTeams));
adminRouter.get("/teams/:id", userAuth, adminAuth, asyncHandler(adminController.getTeam));
adminRouter.delete("/teams/:id", userAuth, adminAuth, asyncHandler(adminController.deleteTeam));

module.exports = adminRouter;
