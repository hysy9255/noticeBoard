const express = require("express");
const likeRouter = express.Router();
const { post, comment } = require("./../controllers/like.controller.js");
const { verifyUser } = require("./../middlewares/signInRequired.js");

likeRouter.post("", verifyUser, post.pushALike); // ***
likeRouter.post("/comment", verifyUser, comment.pushALike); // ***

module.exports = likeRouter;
