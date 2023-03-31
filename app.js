const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const requestIp = require("request-ip");
const routes = require("./src/routes/index.js");

const postController = require("./src/controllers/post.controller.js");
const commentController = require("./src/controllers/comment.controller.js");
const categoryController = require("./src/controllers/category.controller.js");
const likeController = require("./src/controllers/like.controller.js");

const { verifyUser } = require("./src/middlewares/signInRequired.js");
const { softValidator } = require("./src/utils/softValidation.js");
// const { adminValidator } = require("./src/utils/adminValidation.js");

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

  app.use(routes);

  // app.post("/comments", verifyUser, commentController.createAComment);

  // app.patch("/comments", verifyUser, commentController.updateAComment);

  // app.delete("/comments", verifyUser, commentController.deleteAComment);

  // app.delete("/admin", postController.adminDeleteAPost);

  // app.post("/like", verifyUser, likeController.likeAPost);

  // app.get("/like", verifyUser, likeController.retrieveLikes);

  app.use((error, req, res, next) => {
    res.status(400).send({ message: error.message });
  });

  return app;
};

module.exports = { createApp };
