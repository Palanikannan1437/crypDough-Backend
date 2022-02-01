const express = require("express");

const blogRouter = express.Router();
const blogController = require("../controllers/blogController");

blogRouter
  .route("/")
  .get(blogController.getPostedBlogs)
  .post(blogController.saveBlog)
  .patch(blogController.postBlog);

blogRouter
  .route("/:userid")
  .get(blogController.getUserBlogsCount);

module.exports = blogRouter;
