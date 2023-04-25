const mongoose = require("mongoose");
const {
  mainCatSchema,
  subCatSchema,
  subCatRequestSchema,
} = require("../schemas/category.schema.js");

const MainCat = mongoose.model("main_category", mainCatSchema);
const SubCat = mongoose.model("sub_category", subCatSchema);
const SubCatRequest = mongoose.model("subcat_request", subCatRequestSchema);

const retrieveAll = async () => {
  const agg = [
    {
      $group: {
        _id: "$mainCatId",
        subCat: { $push: { name: "$name", id: "$_id" } },
      },
    },
    { $addFields: { mainCatId: "$_id" } },
    { $project: { _id: 0 } },
  ];
  return await SubCat.aggregate(agg);
};

const mainCatDao = {
  // ***
  retrieveAll: async () => {
    const agg = [
      { $addFields: { mainCatId: "$_id", mainCatName: "$name" } },
      { $project: { _id: 0, mainCatId: 1, mainCatName: 1 } },
    ];
    return await MainCat.aggregate(agg);
  },
  // ***
  findOne: async (mainCatName) => {
    return await MainCat.findOne({ name: mainCatName });
  },
  // ***
  getNameById: async (mainCatId) => {
    const mainCat = await MainCat.findOne(
      { _id: mainCatId },
      { _id: 0, name: 1 }
    );
    return mainCat.name;
  },
  // ***
  getNamesByIds: async (mainCatIds) => {
    const agg = [
      { $match: { _id: { $in: mainCatIds } } },
      { $addFields: { mainCatId: "$_id", mainCatName: "$name" } },
      { $project: { _id: 0, mainCatId: 1, mainCatName: 1 } },
    ];
    return await MainCat.aggregate(agg);
  },
  // ***
  create: async (mainCatName) => {
    await MainCat.create({ name: mainCatName });
  },
  // ***
  update: async (mainCatId, newMainCatName) => {
    const mainCat = await MainCat.findOne({ _id: mainCatId });
    mainCat.name = newMainCatName;
    await mainCat.save();
  },
  // ***
  delete: async (mainCatId) => {
    await MainCat.deleteOne({ _id: mainCatId });
  },
};

const subCatDao = {
  // ***
  retrieveAll: async (mainCatId) => {
    const agg = [
      { $match: { mainCatId } },
      { $addFields: { subCatId: "$_id", subCatName: "$name" } },
      { $project: { _id: 0, subCatId: 1, subCatName: 1 } },
    ];
    return await SubCat.aggregate(agg);
  },
  // ***
  findSubCat: async (mainCatId, subCatName) => {
    return await SubCat.findOne({ name: subCatName, mainCatId });
  },
  // ***
  getNamesByIds: async (subCatIds) => {
    const agg = [
      { $match: { _id: { $in: subCatIds } } },
      { $addFields: { subCatId: "$_id", subCatName: "$name" } },
      { $project: { _id: 0, subCatId: 1, subCatName: 1 } },
    ];
    return await SubCat.aggregate(agg);
  },
  // ***
  create: async (mainCatId, subCatName) => {
    await SubCat.create({ name: subCatName, mainCatId });
  },
  // ***
  update: async (subCatId, newSubCatName) => {
    const subCat = await SubCat.findOne({ _id: subCatId });
    subCat.name = newSubCatName;
    subCat.save();
  },
  // ***
  delete: async (subCatId) => {
    await SubCat.deleteOne({ _id: subCatId });
  },
};

const subCatReqDao = {
  // ***
  retrieveAll: async () => {
    const agg = [
      { $match: {} },
      { $addFields: { subCatReqId: "$_id" } },
      { $project: { _id: 0, __v: 0, mainCatId: 0 } },
    ];
    return await SubCatRequest.aggregate(agg);
  },
  // ***
  findSubCatReqById: async (subCatReqId) => {
    return await SubCatRequest.findOne(
      { _id: subCatReqId },
      { mainCatId: 1, subCatName: 1 }
    );
  },
  // ***
  findSubCatReq: async (mainCatId, subCatName) => {
    return await SubCatRequest.findOne({ mainCatId, subCatName });
  },
  // ***
  create: async (mainCatId, mainCatName, subCatName, name, email) => {
    await SubCatRequest.create({
      mainCatId,
      mainCatName,
      subCatName,
      userName: name,
      userEmail: email,
    });
  },
  // ***
  delete: async (subCatReqId) => {
    await SubCatRequest.deleteOne({ _id: subCatReqId });
  },
};

module.exports = { retrieveAll, mainCatDao, subCatDao, subCatReqDao };
