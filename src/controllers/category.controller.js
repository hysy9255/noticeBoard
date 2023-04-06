const { asyncWrap } = require("../utils/error.js");
const {
  mainCatServ,
  subCatServ,
  subCatReqServ,
} = require("./../services/category.service.js");

const mainCat = {
  retrieveAll: asyncWrap(async (req, res) => {
    const mainCats = await mainCatServ.retrieveAll();
    res.status(200).json(mainCats);
  }),
  create: asyncWrap(async (req, res) => {
    const mainCatName = req.body.mainCatName;
    await mainCatServ.create(mainCatName);
    res.status(200).json({ message: "Main category has been created" });
  }),
  delete: asyncWrap(async (req, res) => {
    const mainCatId = req.body.mainCatId;
    await mainCatServ.delete(mainCatId);
    res.status(200).json({ message: "Main category has been deleted" });
  }),
};

const subCat = {
  retrieveAll: asyncWrap(async (req, res) => {
    const mainCatId = req.query.mainCatId;
    const subCats = await subCatServ.retrieveAll(mainCatId);
    res.status(200).json(subCats);
  }),
  create: asyncWrap(async (req, res) => {
    const { subCatName, mainCatId } = req.body;
    await subCatServ.create(subCatName, mainCatId);
    res.status(200).json({ message: "Sub category has been created" });
  }),
  delete: asyncWrap(async (req, res) => {
    const { subCatId, mainCatId } = req.body;
    await subCatServ.delete(subCatId, mainCatId);
    res.status(200).json({ message: "Sub category has been deleted" });
  }),
};

const subCatRequest = {
  submit: asyncWrap(async (req, res) => {
    const { subCatName, mainCatId } = req.body;
    await subCatReqServ.submit(subCatName, mainCatId);
    res.status(200).json({ message: "Sub category has been requested" });
  }),
  retrieveAll: asyncWrap(async (req, res) => {
    const requests = await subCatReqServ.retrieveAll();
    res.status(200).json(requests);
  }),
  accept: asyncWrap(async (req, res) => {
    const { subCatName, mainCatId } = req.body;
    await subCatReqServ.accept(subCatName, mainCatId);
    res.status(200).json({ message: "Sub category request has been accepted" });
  }),
  deny: asyncWrap(async (req, res) => {
    const { subCatName, mainCatId } = req.body;
    await subCatReqServ.delete(subCatName, mainCatId);
    res.status(200).json({ message: "Sub category request has been denied" });
  }),
};

module.exports = {
  mainCat,
  subCat,
  subCatRequest,
};
