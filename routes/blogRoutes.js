const express = require("express");

const blogRouter = express.Router();
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");


blogRouter
  .route("/")
  .get(blogController.getPostedBlogs)
  .post(blogController.saveBlog)
  .patch(blogController.postBlog);

blogRouter.route("/:userid").get(blogController.getUserBlogs);

blogRouter.route("/blog/:blogid").get(blogController.getBlog);

module.exports = blogRouter;
