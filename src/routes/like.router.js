const express = require("express");
const likeRouter = express.Router();
const {
  verifyUser,
  verifyUserOptionally,
} = require("./../middlewares/signInRequired.js");
const {
  pushALike,
  retrieveLikes,
} = require("./../controllers/like.controller.js");

likeRouter.get("", verifyUserOptionally, retrieveLikes);
likeRouter.post("", verifyUser, pushALike);

module.exports = likeRouter;
