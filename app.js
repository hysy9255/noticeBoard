const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const requestIp = require("request-ip");

const postController = require("./src/controllers/post.controller.js");
const commentController = require("./src/controllers/comment.controller.js");
const categoryController = require("./src/controllers/category.controller.js");
const likeController = require("./src/controllers/like.controller.js");

const { jwtValidator } = require("./src/utils/jwtValidation.js");
const { softValidator } = require("./src/utils/softValidation.js");
const { adminValidator } = require("./src/utils/adminValidation.js");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(requestIp.mw());
  app.use((req, res, next) => {
    const ip = req.clientIp;
    console.log(ip);
    next();
  });

  // Health Check
  app.get("/hello", async (req, res) => {
    res.status(200).send("hello");
  });

  app.get("/postTitles/byCategory", postController.retrieveTitlesByCategory);

  app.post("/posts", jwtValidator, postController.createAPost);

  app.get("/posts", softValidator, postController.retrieveAPost);

  app.patch("/posts", jwtValidator, postController.updateAPost);

  app.delete("/posts", jwtValidator, postController.deleteAPost);

  app.post("/comments", jwtValidator, commentController.createAComment);

  app.patch("/comments", jwtValidator, commentController.updateAComment);

  app.delete("/comments", jwtValidator, commentController.deleteAComment);

  app.delete("/admin", adminValidator, postController.adminDeleteAPost);

  app.post("/category", adminValidator, categoryController.createACategory);

  app.delete("/category", adminValidator, categoryController.deleteACategory);

  app.get("/category", categoryController.retrieveCategories);

  app.post("/like", jwtValidator, likeController.likeAPost);

  app.get("/like", jwtValidator, likeController.retrieveLikes);

  app.use((error, req, res, next) => {
    res.status(400).send({ message: error.message });
  });

  return app;
};

module.exports = { createApp };
