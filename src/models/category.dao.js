const mongoose = require("mongoose");
const { categorySchema } = require("../schemas/category.schema.js");

const Category = mongoose.model("category", categorySchema);

const createACategory = async (category) => {
  await Category.create({ category });
};

const retrieveCategories = async () => {
  return await Category.find({});
};

const findACategory = async (category) => {
  return await Category.findOne({ category });
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
