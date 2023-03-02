const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const postController = require("./src/controllers/post.controller.js");
const commentController = require("./src/controllers/comment.controller.js");

const { jwtValidator } = require("./src/utils/jwtValidation.js");
const { validateAuthor } = require("./src/utils/validateAuthor.js");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  // Health Check
  app.get("/hello", async (req, res) => {
    res.status(200).send("hello");
  });

  app.get("/allPosts", postController.retrieveAllPosts);

  app.post("/posts", jwtValidator, postController.createAPost);

  app.get("/posts", postController.retrieveAPost);

  app.patch("/posts", jwtValidator, validateAuthor, postController.updateAPost);

  app.delete(
    "/posts",
    jwtValidator,
    validateAuthor,
    postController.deleteAPost
  );

  app.post("/comments", jwtValidator, commentController.postAComment);

  app.patch(
    "/comments",
    jwtValidator,
    validateAuthor,
    commentController.updateAComment
  );

  app.delete(
    "/comments",
    jwtValidator,
    validateAuthor,
    commentController.deleteAComment
  );

  app.use((error, req, res, next) => {
    res.status(400).send(error.message);
  });

  return app;
};

module.exports = { createApp };
