const mongoose = require("mongoose");

const mainCatSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const subCatSchema = new mongoose.Schema({
  mainCatId: { type: String, require: true },
  name: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const subCatRequestSchema = new mongoose.Schema({
  mainCatId: { type: String, require: true },
  mainCatName: { type: String, require: true },
  subCatName: { type: String, unique: true, require: true },
  userName: { type: String, require: true },
  userEmail: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

subCatSchema.index({ mainCatId: 1, name: 1 }, { unique: true });
subCatRequestSchema.index({ mainCatId: 1, subCatName: 1 }, { unique: true });

module.exports = { mainCatSchema, subCatSchema, subCatRequestSchema };
