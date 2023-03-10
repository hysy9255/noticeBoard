const categoryService = require("./../services/category.service.js");

const retrieveCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.retrieveCategories();
    res.status(200).json({
      message: "All categories have been retrieved",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const createACategory = async (req, res, next) => {
  try {
    const categoryCreated = await categoryService.createACategory(
      req.body.category
    );
    res
      .status(200)
      .json({ message: "Category has been created", data: categoryCreated });
  } catch (error) {
    next(error);
  }
};

const deleteACategory = async (req, res, next) => {
  try {
    const categoryDeleted = await categoryService.deleteACategory(
      req.body.category
    );
    res
      .status(200)
      .json({ message: "Category has been deleted", data: categoryDeleted });
  } catch (error) {
    next(error);
  }
};

module.exports = { retrieveCategories, createACategory, deleteACategory };
