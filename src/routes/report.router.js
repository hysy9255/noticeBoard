const express = require("express");
const reportRouter = express.Router();
const {
  verifyUser,
  verifyAdmin,
} = require("./../middlewares/signInRequired.js");
const { post, comment } = require("./../controllers/report.controller.js");

reportRouter.post("/post", verifyUser, post.report);
reportRouter.get("/post", verifyAdmin, post.showReports);

reportRouter.post("/comment", verifyUser, comment.report);
reportRouter.get("/comment", verifyAdmin, comment.showReports);

module.exports = reportRouter;
