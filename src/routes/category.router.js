const express = require("express");
const categoryRouter = express.Router();
const { adminValidator } = require("./../utils/adminValidation");
const {
  createACategory,
  deleteACategory,
  retrieveCategories,
} = require("../controllers/category.controller.js");

categoryRouter.post("", adminValidator, createACategory);
categoryRouter.delete("", adminValidator, deleteACategory);
categoryRouter.patch("", retrieveCategories);

module.exports = categoryRouter;
