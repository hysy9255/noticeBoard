const express = require("express");
const categoryRouter = require("./category.router.js");
const postRouter = require("./post.router.js");
const commentRouter = require("./comment.router.js");
const likeRouter = require("./like.router.js");

const routes = express.Router();
routes.use("/nb/category", categoryRouter);
routes.use("/nb/post", postRouter);
routes.use("/nb/comment", commentRouter);
// routes.use("/nb/like", likeRouter);

module.exports = routes;
