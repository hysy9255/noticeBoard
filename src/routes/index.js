const express = require("express");
const categoryRouter = require("./category.router.js");
const postRouter = require("./post.router.js");
const commentRouter = require("./comment.router.js");
const likeRouter = require("./like.router.js");
const reportRouter = require("./report.router.js");
const searchRouter = require("./search.router.js");
const alertRouter = require("./alert.router.js");

const routes = express.Router();
routes.use("/nb/category", categoryRouter); // ***
routes.use("/nb/post", postRouter); // * haven't done userPage yet
routes.use("/nb/comment", commentRouter); // ***
routes.use("/nb/like", likeRouter); // ***
routes.use("/nb/search", searchRouter);
routes.use("/nb/report", reportRouter);
routes.use("/nb/alert", alertRouter); // ***

module.exports = routes;
