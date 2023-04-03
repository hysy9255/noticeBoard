const express = require("express");
const commentRouter = express.Router();
const {
  verifyUser,
  verifyAdmin,
} = require("./../middlewares/signInRequired.js");
const {
  createAComment,
  updateAComment,
  deleteAComment,
  adminDeleteAComment,
} = require("./../controllers/comment.controller.js");

commentRouter.post("", verifyUser, createAComment);

commentRouter.patch("", verifyUser, updateAComment);

commentRouter.delete("", verifyUser, deleteAComment);

commentRouter.delete("/admin", verifyAdmin, adminDeleteAComment);

module.exports = commentRouter;
