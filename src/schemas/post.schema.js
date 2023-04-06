const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  accountId: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  contents: { type: String, require: true },
  modifyAllowed: Boolean,
  deleteAllowed: Boolean,
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const postSchema = new mongoose.Schema({
  accountId: { type: String, require: true },
  mainCategory: { type: String, require: true },
  subCategory: { type: String, require: true },
  title: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  contents: { type: String, require: true },
  modifyAllowed: Boolean,
  deleteAllowed: Boolean,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  comments: [commentSchema],
});

module.exports = { postSchema };
