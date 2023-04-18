const error = require("./utils/service.error");
const { getUserInfo } = require("../utils/superagent");
const {
  mainCatDao,
  subCatDao,
  subCatReqDao,
} = require("./../models/category.dao.js");
const categoryDao = require("../models/category.dao");

const retrieveAll = async () => {
  const result = await categoryDao.retrieveAll();
  console.log(result);
  const result2 = await mainCatDao.retrieveAll();
  // console.log(result2);
  const merged = [];
  for (let i = 0; i < result.length; i++) {
    merged.push({
      ...result[i],
      ...result2.find(
        (doc) => doc.mainCatId.toString() === result[i].mainCatId
      ),
    });
  }
  return merged;
};

const mainCatServ = {
  // ***
  retrieveAll: async () => {
    return await mainCatDao.retrieveAll();
  },
  // ***
  create: async (mainCatName) => {
    await error.checkDuplicates.forMain(mainCatName);
    await mainCatDao.create(mainCatName);
  },
  // ***
  update: async (mainCatId, newMainCatName) => {
    await mainCatDao.update(mainCatId, newMainCatName);
  },
  // ***
  delete: async (mainCatId) => {
    await mainCatDao.delete(mainCatId);
  },
};

const subCatServ = {
  // ***
  retrieveAll: async (mainCatId) => {
    return await subCatDao.retrieveAll(mainCatId);
  },
  // ***
  create: async (mainCatId, subCatName) => {
    const mainCatName = await mainCatDao.getNameById(mainCatId);
    await error.checkDuplicates.forSub(mainCatId, mainCatName, subCatName);
    await subCatDao.create(mainCatId, subCatName);
  },
  // ***
  update: async (subCatId, newSubCatName) => {
    await subCatDao.update(subCatId, newSubCatName);
  },
  // ***
  delete: async (subCatId) => {
    await subCatDao.delete(subCatId);
  },
};

const subCatReqServ = {
  // ***
  submit: async (mainCatId, subCatName, accountId) => {
    const mainCatName = await mainCatDao.getNameById(mainCatId);
    await error.checkDuplicates.forSub(mainCatId, mainCatName, subCatName);
    await error.checkDuplicates.forSubReq(mainCatId, mainCatName, subCatName);
    const userInfo = await getUserInfo(accountId);
    const { name, email } = userInfo;
    await subCatReqDao.create(mainCatId, mainCatName, subCatName, name, email);
  },
  // ***
  retrieveAll: async () => {
    return await subCatReqDao.retrieveAll();
  },
  // ***
  accept: async (subCatReqId) => {
    const subCatReq = await subCatReqDao.findSubCatReqById(subCatReqId);
    const { mainCatId, subCatName } = subCatReq;
    await subCatDao.create(mainCatId, subCatName);
    await subCatReqDao.delete(subCatReqId);
  },
  // ***
  deny: async (subCatReqId) => {
    await subCatReqDao.delete(subCatReqId);
  },
};

module.exports = { retrieveAll, mainCatServ, subCatServ, subCatReqServ };
