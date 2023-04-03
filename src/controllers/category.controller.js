const categoryService = require("./../services/category.service.js");
const { asyncWrap } = require("../utils/error.js");

const retrieveCategories = asyncWrap(async (req, res) => {
  const categories = await categoryService.retrieveCategories();
  res.status(200).json({
    message: "All categories have been retrieved",
    data: categories,
  });
});

const createACategory = asyncWrap(async (req, res) => {
  const categoryCreated = await categoryService.createACategory(
    req.body.category
  );
  res
    .status(200)
    .json({ message: "Category has been created", data: categoryCreated });
});

const deleteACategory = asyncWrap(async (req, res) => {
  const categoryDeleted = await categoryService.deleteACategory(
    req.body.category
  );
  res
    .status(200)
    .json({ message: "Category has been deleted", data: categoryDeleted });
});

module.exports = { retrieveCategories, createACategory, deleteACategory };
