const express = require("express");
const postRouter = express.Router();
const {
  verifyUser,
  verifyUserOptionally,
  verifyAdmin,
} = require("./../middlewares/signInRequired.js");
const {
  retrievePosts,
  retrieveUserPosts,
  createAPost,
  retrieveAPost,
  updateAPost,
  deleteAPost,
  adminDeleteAPost,
} = require("./../controllers/post.controller.js");

postRouter.post("", verifyUser, createAPost); // ***
postRouter.get("/list", retrievePosts); // ***
postRouter.get("", verifyUserOptionally, retrieveAPost); // ***
postRouter.patch("", verifyUser, updateAPost); // ***
postRouter.delete("", verifyUser, deleteAPost); // ***
postRouter.delete("/admin", verifyAdmin, adminDeleteAPost); // ***
postRouter.get("/user", retrieveUserPosts);

module.exports = postRouter;
