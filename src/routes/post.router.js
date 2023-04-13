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

postRouter.get("/list", retrievePosts);

postRouter.get("/user", retrieveUserPosts);

postRouter.post("", verifyUser, createAPost);
postRouter.get("", verifyUserOptionally, retrieveAPost);
postRouter.patch("", verifyUser, updateAPost);
postRouter.delete("", verifyUser, deleteAPost);

postRouter.delete("/admin", verifyAdmin, adminDeleteAPost);

module.exports = postRouter;
