const error = require("./utils/service.error");
const {
  mainCatDao,
  subCatDao,
  subCatReqDao,
} = require("./../models/category.dao.js");

const mainCatServ = {
  retrieveAll: async () => {
    return await mainCatDao.retrieveAll();
  },
  create: async (mainCatName) => {
    await error.checkDuplicates.forMain(mainCatName);
    await mainCatDao.create(mainCatName);
  },
  delete: async (mainCatId) => {
    await mainCatDao.delete(mainCatId);
  },
};

const subCatServ = {
  retrieveAll: async (mainCatId) => {
    return await subCatDao.retrieveAll(mainCatId);
  },
  create: async (subCatName, mainCatId) => {
    await error.checkDuplicates.forSub(subCatName, mainCatId);
    await subCatDao.create(subCatName, mainCatId);
  },
  delete: async (subCatId, mainCatId) => {
    await subCatDao.delete(subCatId, mainCatId);
  },
};

const subCatReqServ = {
  submit: async (subCatName, mainCatId) => {
    await subCatReqDao.create(subCatName, mainCatId);
  },
  retrieveAll: async () => {
    return await subCatReqDao.retrieveAll();
  },
  accept: async (subCatName, mainCatId) => {
    await subCatDao.create(subCatName, mainCatId);
    await subCatReqDao.delete(subCatName, mainCatId);
  },
  delete: async (subCatName, mainCatId) => {
    await subCatReqDao.delete(subCatName, mainCatId);
  },
};

module.exports = { mainCatServ, subCatServ, subCatReqServ };
