const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  accountId: String,
  name: String,
  email: String,
  contents: String,
  modifyAllowed: Boolean,
  deleteAllowed: Boolean,
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const postSchema = new mongoose.Schema({
  accountId: String,
  category: String,
  title: String,
  name: String,
  email: String,
  contents: String,
  modifyAllowed: Boolean,
  deleteAllowed: Boolean,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  comments: [commentSchema],
});

module.exports = { postSchema };