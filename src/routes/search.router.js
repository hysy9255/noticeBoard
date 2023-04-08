const express = require("express");
const searchRouter = express.Router();
const { search } = require("./../controllers/search.controller.js");

searchRouter.get("", search);

module.exports = searchRouter;
