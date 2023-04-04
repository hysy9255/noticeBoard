const { detectError } = require("../../utils/error.js");
const categoryDao = require("../../models/category.dao");

const checkTheAuthor = (accountId, contents) => {
  if (contents.accountId !== accountId) {
    detectError("Only the author of the content can edit/delete it", 400);
  }
};

const findMainCat = async (mainCatName) => {
  const exists = await categoryDao.findMainCat(mainCatName);
  if (exists) {
    detectError("Given main category already exists", 400);
  }
};

const findSubCat = async (subCatName, mainCatId) => {
  const exists = await categoryDao.findSubCat(subCatName, mainCatId);
  if (exists) {
    detectError("Given sub category already exists", 400);
  }
};

const checkDuplicates = {
  forMain: findMainCat,
  forSub: findSubCat,
};

module.exports = {
  checkTheAuthor,
  checkDuplicates,
};
