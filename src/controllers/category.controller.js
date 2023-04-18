const { asyncWrap } = require("../utils/error.js");
const {
  mainCatServ,
  subCatServ,
  subCatReqServ,
} = require("./../services/category.service.js");
const categoryService = require("../services/category.service");

const retrieveAll = asyncWrap(async (req, res) => {
  const categories = await categoryService.retrieveAll();
  res.status(200).json(categories);
});

const mainCat = {
  // ***
  retrieveAll: asyncWrap(async (req, res) => {
    const mainCats = await mainCatServ.retrieveAll();
    res.status(200).json(mainCats);
  }),
  // ***
  create: asyncWrap(async (req, res) => {
    const mainCatName = req.body.mainCatName;
    await mainCatServ.create(mainCatName);
    res.status(200).json({ message: "Main category has been created" });
  }),
  // ***
  update: asyncWrap(async (req, res) => {
    const { mainCatId, newMainCatName } = req.body;
    await mainCatServ.update(mainCatId, newMainCatName);
    res.status(200).json({ message: "Main category has been updated" });
  }),
  // ***
  delete: asyncWrap(async (req, res) => {
    const mainCatId = req.body.mainCatId;
    await mainCatServ.delete(mainCatId);
    res.status(200).json({ message: "Main category has been deleted" });
  }),
};

const subCat = {
  // ***
  retrieveAll: asyncWrap(async (req, res) => {
    const mainCatId = req.query.mainCatId;
    const subCats = await subCatServ.retrieveAll(mainCatId);
    res.status(200).json(subCats);
  }),
  // ***
  create: asyncWrap(async (req, res) => {
    const { mainCatId, subCatName } = req.body;
    await subCatServ.create(mainCatId, subCatName);
    res.status(200).json({ message: "Sub category has been created" });
  }),
  // ***
  update: asyncWrap(async (req, res) => {
    const { subCatId, newSubCatName } = req.body;
    await subCatServ.update(subCatId, newSubCatName);
    res.status(200).json({ message: "Sub category has been updated" });
  }),
  // ***
  delete: asyncWrap(async (req, res) => {
    const { subCatId } = req.body;
    await subCatServ.delete(subCatId);
    res.status(200).json({ message: "Sub category has been deleted" });
  }),
};

const subCatRequest = {
  // ***
  submit: asyncWrap(async (req, res) => {
    const { mainCatId, subCatName } = req.body;
    const { accountId } = res.locals;
    await subCatReqServ.submit(mainCatId, subCatName, accountId);
    res.status(200).json({ message: "Sub category has been requested" });
  }),
  // ***
  retrieveAll: asyncWrap(async (req, res) => {
    const requests = await subCatReqServ.retrieveAll();
    res.status(200).json(requests);
  }),
  // ***
  accept: asyncWrap(async (req, res) => {
    const { subCatReqId } = req.body;
    await subCatReqServ.accept(subCatReqId);
    res.status(200).json({ message: "Sub category request has been accepted" });
  }),
  // ***
  deny: asyncWrap(async (req, res) => {
    const { subCatReqId } = req.body;
    await subCatReqServ.deny(subCatReqId);
    res.status(200).json({ message: "Sub category request has been denied" });
  }),
};

module.exports = {
  mainCat,
  subCat,
  subCatRequest,
  retrieveAll,
};
