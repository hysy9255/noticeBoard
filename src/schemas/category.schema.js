const mongoose = require("mongoose");

const mainCatSchema = new mongoose.Schema({
  mainCatName: { type: String, unique: true, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const subCatSchema = new mongoose.Schema({
  mainCatId: { type: String, require: true },
  subCatName: { type: String, unique: true, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const subCatRequestSchema = new mongoose.Schema({
  mainCatId: { type: String, require: true },
  subCatName: { type: String, unique: true, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

module.exports = { mainCatSchema, subCatSchema, subCatRequestSchema };
