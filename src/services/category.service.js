const categoryDao = require("./../models/category.dao.js");
const error = require("./utils/service.error");

const retrieveMainCats = async () => {
  return await categoryDao.retrieveMainCats();
};

const createMainCat = async (mainCatName) => {
  await error.checkDuplicates.forMain(mainCatName);
  await categoryDao.createMainCat(mainCatName);
};

const deleteMainCat = async (mainCatId) => {
  await categoryDao.deleteMainCat(mainCatId);
};

const retrieveSubCats = async (mainCatId) => {
  return await categoryDao.retrieveSubCats(mainCatId);
};

const createSubCat = async (subCatName, mainCatId) => {
  await error.checkDuplicates.forSub(subCatName, mainCatId);
  await categoryDao.createSubCat(subCatName, mainCatId);
};

const deleteSubCat = async (subCatId, mainCatId) => {
  await categoryDao.deleteSubCat(subCatId, mainCatId);
};

const requestSubCat = async (subCatName, mainCatId) => {
  await categoryDao.requestSubCat(subCatName, mainCatId);
};

const retrieveRequests = async () => {
  return await categoryDao.retrieveRequests();
};

const deleteARequest = async (subCatName, mainCatId) => {
  await categoryDao.deleteARequest(subCatName, mainCatId);
};

module.exports = {
  retrieveMainCats,
  createMainCat,
  deleteMainCat,
  retrieveSubCats,
  createSubCat,
  deleteSubCat,
  requestSubCat,
  retrieveRequests,
  deleteARequest,
};
