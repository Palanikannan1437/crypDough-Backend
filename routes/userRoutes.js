const express = require('express')

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.route('/api/v1/userRoutes').get()

module.exports = userRouter;