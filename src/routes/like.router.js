const express = require("express");
const likeRouter = express.Router();
const {
  verifyUser,
  verifyUserOptionally,
} = require("./../middlewares/signInRequired.js");
const {
  pushALike,
  retrieveLikes,
  pushALikeForComment,
  retrieveCommentLikes,
} = require("./../controllers/like.controller.js");

likeRouter.get("", verifyUserOptionally, retrieveLikes);
likeRouter.post("", verifyUser, pushALike);
likeRouter.post("/comment", verifyUser, pushALikeForComment);
likeRouter.get("/comment", verifyUserOptionally, retrieveCommentLikes);

module.exports = likeRouter;
