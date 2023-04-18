const express = require("express");
const commentRouter = express.Router();
const {
  verifyUser,
  verifyUserOptionally,
  verifyAdmin,
} = require("./../middlewares/signInRequired.js");
const {
  createAComment,
  updateAComment,
  deleteAComment,
  retrieveComments,
  adminDeleteAComment,
} = require("./../controllers/comment.controller.js");

commentRouter.get("", verifyUserOptionally, retrieveComments); // ***
commentRouter.post("", verifyUser, createAComment); // ***
commentRouter.patch("", verifyUser, updateAComment); // ***
commentRouter.delete("", verifyUser, deleteAComment); // ***
commentRouter.delete("/admin", verifyAdmin, adminDeleteAComment); // ***

module.exports = commentRouter;
