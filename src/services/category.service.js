const { detectError } = require("../utils/error.js");
const categoryDao = require("./../models/category.dao.js");

const createACategory = async (category) => {
  const duplicateExists = await categoryDao.findACategory(category);
  if (duplicateExists) {
    detectError("Given category already exists", 400);
  }
  await categoryDao.createACategory(category);
};

const deleteACategory = async (category) => {
  const categoryDeleted = await categoryDao.deleteACategory(category);
  return categoryDeleted;
};

const retrieveCategories = async () => {
  const categories = await categoryDao.retrieveCategories();
  return categories;
};

module.exports = { retrieveCategories, createACategory, deleteACategory };
