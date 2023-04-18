const { detectError } = require("../../utils/error.js");
const {
  mainCatDao,
  subCatDao,
  subCatReqDao,
} = require("../../models/category.dao");
// ***
const checkTheAuthor = (accountId, contents) => {
  if (contents.accountId !== accountId) {
    detectError("Only the author of the content can edit/delete it", 400);
  }
};
// ***
const findMainCat = async (mainCatName) => {
  const exists = await mainCatDao.findOne(mainCatName);
  if (exists) {
    detectError(`Main category - ${mainCatName} already exists`, 400);
  }
};
// ***
const findSubCat = async (mainCatId, mainCatName, subCatName) => {
  const exists = await subCatDao.findSubCat(mainCatId, subCatName);
  if (exists) {
    detectError(
      `Subcategory - ${subCatName} already exists under ${mainCatName}`,
      400
    );
  }
};
// ***
const findSubCatReq = async (mainCatId, mainCatName, subCatName) => {
  const exists = await subCatReqDao.findSubCatReq(mainCatId, subCatName);
  if (exists) {
    detectError(
      `Subcategory - ${subCatName} for ${mainCatName} already has been requested. Please wait for the admin to approve it`,
      400
    );
  }
};
// ***
const checkDuplicates = {
  forMain: findMainCat,
  forSub: findSubCat,
  forSubReq: findSubCatReq,
};

module.exports = {
  checkTheAuthor,
  checkDuplicates,
};
