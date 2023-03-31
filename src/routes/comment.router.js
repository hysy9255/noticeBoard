const express = require("express");
const commentRouter = express.Router();
const commentController = require("./../controllers/comment.controller.js");
const { asyncWrap } = require("./../utils/error.js");
const required = require("./../middlewares/signInRequired.js");

commentRouter.post(
  "",
  required.verifyUser,
  asyncWrap(commentController.createAComment)
);

commentRouter.patch(
  "",
  required.verifyUser,
  asyncWrap(commentController.updateAComment)
);

commentRouter.delete(
  "",
  required.verifyUser,
  asyncWrap(commentController.deleteAComment)
);

commentRouter.delete(
  "/admin",
  required.verifyAdmin,
  asyncWrap(commentController.adminDeleteAComment)
);

module.exports = commentRouter;
