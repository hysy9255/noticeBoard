const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  accountId: { type: String, require: true },
  mainCatId: { type: String, require: true },
  subCatId: { type: String, require: true },
  title: { type: String, require: true },
  contents: { type: String, require: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = { postSchema };
