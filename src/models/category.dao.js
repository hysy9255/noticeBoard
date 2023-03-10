const mongoose = require("mongoose");
const { categorySchema } = require("../schemas/category.schema.js");

const Category = mongoose.model("category", categorySchema);

const retrieveCategories = async () => {
  return await Category.find({});
};

const findACategory = async (category) => {
  return await Category.findOne({ category });
};

const createACategory = async (category) => {
  const categoryCreated = await Category.create({ category });
  return categoryCreated;
};

const deleteACategory = async (category) => {
  const categoryDeleted = await Category.deleteOne({ category });
  return categoryDeleted;
};

module.exports = {
  retrieveCategories,
  createACategory,
  deleteACategory,
  findACategory,
};
