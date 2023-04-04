const categoryService = require("./../services/category.service.js");
const { asyncWrap } = require("../utils/error.js");

const retrieveMainCats = asyncWrap(async (req, res) => {
  const mainCats = await categoryService.retrieveMainCats();
  res.status(200).json(mainCats);
});

const createMainCat = asyncWrap(async (req, res) => {
  const mainCatName = req.body.mainCatName;
  await categoryService.createMainCat(mainCatName);
  res.status(200).json({ message: "Main category has been created" });
});

const deleteMainCat = asyncWrap(async (req, res) => {
  const mainCatId = req.body.mainCatId;
  await categoryService.deleteMainCat(mainCatId);
  res.status(200).json({ message: "Main category has been deleted" });
});

const retrieveSubCats = asyncWrap(async (req, res) => {
  const mainCatId = req.query.mainCatId;
  const subCats = await categoryService.retrieveSubCats(mainCatId);
  res.status(200).json(subCats);
});

const createSubCat = asyncWrap(async (req, res) => {
  const { subCatName, mainCatId } = req.body;
  await categoryService.createSubCat(subCatName, mainCatId);
  res.status(200).json({ message: "Sub category has been created" });
});

const deleteSubCat = asyncWrap(async (req, res) => {
  const { subCatId, mainCatId } = req.body;
  await categoryService.deleteMainCat(subCatId, mainCatId);
  res.status(200).json({ message: "Sub category has been deleted" });
});

const requestSubCat = asyncWrap(async (req, res) => {
  const { subCatName, mainCatId } = req.body;
  await categoryService.requestSubCat(subCatName, mainCatId);
  res.status(200).json({ message: "Sub category has been requested" });
});

const retrieveRequests = asyncWrap(async (req, res) => {
  const requests = await categoryService.retrieveRequests();
  res.status(200).json(requests);
});

const acceptARequest = asyncWrap(async (req, res) => {
  const { subCatName, mainCatId } = req.body;
  await categoryService.createSubCat(subCatName, mainCatId);
  await categoryService.deleteARequest(subCatName, mainCatId);
  res.status(200).json({ message: "Sub category request has been accepted" });
});

const denyARequest = asyncWrap(async (req, res) => {
  const { subCatName, mainCatId } = req.body;
  await categoryService.deleteARequest(subCatName, mainCatId);
  res.status(200).json({ message: "Sub category request has been denied" });
});

module.exports = {
  retrieveMainCats,
  createMainCat,
  deleteMainCat,
  retrieveSubCats,
  createSubCat,
  deleteSubCat,
  requestSubCat,
  retrieveRequests,
  acceptARequest,
  denyARequest,
};
