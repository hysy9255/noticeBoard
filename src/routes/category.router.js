const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category.controller.js");
const { asyncWrap } = require("../utils/error.js");
const { adminValidator } = require("./../utils/adminValidation");

categoryRouter.post(
  "",
  adminValidator,
  asyncWrap(categoryController.createACategory)
);
categoryRouter.delete(
  "",
  adminValidator,
  asyncWrap(categoryController.deleteACategory)
);
categoryRouter.patch("", asyncWrap(categoryController.retrieveCategories));

module.exports = categoryRouter;
