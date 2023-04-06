const mongoose = require("mongoose");
const {
  mainCatSchema,
  subCatSchema,
  subCatRequestSchema,
} = require("../schemas/category.schema.js");

const MainCat = mongoose.model("main_category", mainCatSchema);
const SubCat = mongoose.model("sub_category", subCatSchema);
const SubCatRequest = mongoose.model("subCatRequest", subCatRequestSchema);

const mainCatDao = {
  retrieveAll: async () => {
    return await MainCat.find({}, { _id: 1, mainCatName: 1 });
  },
  findOne: async (mainCatName) => {
    return await MainCat.findOne({ mainCatName });
  },
  create: async (mainCatName) => {
    await MainCat.create({ mainCatName });
  },
  delete: async (mainCatId) => {
    await MainCat.deleteOne({ _id: mainCatId });
  },
};

const subCatDao = {
  retrieveAll: async (mainCatId) => {
    return await SubCat.find(
      { mainCatId },
      { _id: 1, mainCatId: 1, subCatName: 1 }
    );
  },
  findOne: async (subCatName, mainCatId) => {
    return await SubCat.findOne({ subCatName, mainCatId });
  },
  create: async (subCatName, mainCatId) => {
    await SubCat.create({ subCatName, mainCatId });
  },
  delete: async (subCatId, mainCatId) => {
    await SubCat.deleteOne({ _id: subCatId, mainCatId });
  },
};

const subCatReqDao = {
  retrieveAll: async () => {
    return await SubCatRequest.find(
      {},
      { _id: 0, mainCatId: 1, subCatName: 1, createdAt: 1 }
    );
  },
  create: async (subCatName, mainCatId) => {
    await SubCatRequest.create({ subCatName, mainCatId });
  },
  delete: async (subCatName, mainCatId) => {
    await SubCatRequest.deleteOne({ subCatName, mainCatId });
  },
};

module.exports = { mainCatDao, subCatDao, subCatReqDao };
