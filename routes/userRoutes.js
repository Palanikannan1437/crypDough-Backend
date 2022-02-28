const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const userRouter = express.Router();
userRouter.route("/signup").post(authController.signUp);
userRouter.route("/login").post(authController.login);

module.exports = userRouter;
