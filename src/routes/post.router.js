const express = require("express");
const postRouter = express.Router();
const postController = require("./../controllers/post.controller.js");
const { asyncWrap } = require("./../utils/error.js");
const required = require("./../middlewares/signInRequired.js");
const optional = require("./../middlewares/signInOptional.js");

postRouter.get("/list", asyncWrap(postController.retrievePosts));
postRouter.post("", required.verifyUser, asyncWrap(postController.createAPost));
postRouter.get(
  "",
  optional.verifyUser,
  asyncWrap(postController.retrieveAPost)
);
postRouter.patch(
  "",
  required.verifyUser,
  asyncWrap(postController.updateAPost)
);
postRouter.delete(
  "",
  required.verifyUser,
  asyncWrap(postController.deleteAPost)
);

postRouter.delete(
  "/admin",
  required.verifyAdmin,
  asyncWrap(postController.adminDeleteAPost)
);

module.exports = postRouter;
