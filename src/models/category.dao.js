const mongoose = require("mongoose");
const {
  mainCatSchema,
  subCatSchema,
  subCatRequestSchema,
} = require("../schemas/category.schema.js");

const MainCat = mongoose.model("main_category", mainCatSchema);
const SubCat = mongoose.model("sub_category", subCatSchema);
const SubCatRequest = mongoose.model("subCatRequest", subCatRequestSchema);

const retrieveMainCats = async () => {
  return await MainCat.find({}, { _id: 1, mainCatName: 1 });
};

const findMainCat = async (mainCatName) => {
  return await MainCat.findOne({ mainCatName });
};

const createMainCat = async (mainCatName) => {
  await MainCat.create({ mainCatName });
};

const deleteMainCat = async (mainCatId) => {
  await MainCat.deleteOne({ _id: mainCatId });
};

const retrieveSubCats = async (mainCatId) => {
  return await SubCat.find(
    { mainCatId },
    { _id: 1, mainCatId: 1, subCatName: 1 }
  );
};

const findSubCat = async (subCatName, mainCatId) => {
  return await SubCat.findOne({ subCatName, mainCatId });
};

const createSubCat = async (subCatName, mainCatId) => {
  await SubCat.create({ subCatName, mainCatId });
};

const deleteSubCat = async (subCatId, mainCatId) => {
  await SubCat.deleteOne({ _id: subCatId, mainCatId });
};

const requestSubCat = async (subCatName, mainCatId) => {
  await SubCatRequest.create({ subCatName, mainCatId });
};

const retrieveRequests = async () => {
  return await SubCatRequest.find(
    {},
    { _id: 0, mainCatId: 1, subCatName: 1, createdAt: 1 }
  );
};

const deleteARequest = async (subCatName, mainCatId) => {
  await SubCatRequest.deleteOne({ subCatName, mainCatId });
};

module.exports = {
  retrieveMainCats,
  findMainCat,
  createMainCat,
  deleteMainCat,
  retrieveSubCats,
  findSubCat,
  createSubCat,
  deleteSubCat,
  requestSubCat,
  retrieveRequests,
  deleteARequest,
};
