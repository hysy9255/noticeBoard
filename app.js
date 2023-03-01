const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const postController = require("./src/controllers/post.controller.js");
const commentController = require("./src/controllers/comment.controller.js");

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

  app.post("/posts", postController.createAPost);

  app.get("/posts", postController.retrieveAPost);

  app.patch("/posts", postController.updateAPost);

  app.delete("/posts", postController.deleteAPost);

  app.post("/comments", commentController.postAComment);

  app.patch("/comments", commentController.updateAComment);

  app.delete("/comments", commentController.deleteAComment);

  return app;
};

module.exports = { createApp };
