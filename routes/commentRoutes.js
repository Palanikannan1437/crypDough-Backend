const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");
commentRouter.route('/').post(commentController.submitComment);
commentRouter.route('/:parentid').get(commentController.getComments);
commentRouter.route('/count/:parentid').get(commentController.getCommentCount);
module.exports = commentRouter;