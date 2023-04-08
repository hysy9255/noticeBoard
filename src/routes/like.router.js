const express = require("express");
const likeRouter = express.Router();
const { post, comment } = require("./../controllers/like.controller.js");
const {
  verifyUser,
  verifyUserOptionally,
} = require("./../middlewares/signInRequired.js");

likeRouter.post("", verifyUser, post.pushALike);
likeRouter.get("", verifyUserOptionally, post.retrieveLikes);
likeRouter.post("/comment", verifyUser, comment.pushALike);
likeRouter.get("/comment", verifyUserOptionally, comment.retrieveLikes);

module.exports = likeRouter;
