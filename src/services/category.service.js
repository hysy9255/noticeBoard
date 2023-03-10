const categoryDao = require("./../models/category.dao.js");

const retrieveCategories = async () => {
  try {
    const categories = await categoryDao.retrieveCategories();
    return categories;
  } catch (error) {
    throw error;
  }
};

const createACategory = async (category) => {
  try {
    const duplicateExists = await categoryDao.findACategory(category);
    if (duplicateExists) {
      throw new Error("Given category already exists");
    }
    const categoryCreated = await categoryDao.createACategory(category);
    return categoryCreated;
  } catch (error) {
    throw error;
  }
};

const deleteACategory = async (category) => {
  try {
    const categoryDeleted = await categoryDao.deleteACategory(category);
    return categoryDeleted;
  } catch (error) {
    throw error;
  }
};

module.exports = { retrieveCategories, createACategory, deleteACategory };
