const express = require("express");
const searchRouter = express.Router();
const {
  autoComplete,
  search,
} = require("./../controllers/search.controller.js");

searchRouter.get("/auto", autoComplete);
searchRouter.get("", search);

module.exports = searchRouter;
