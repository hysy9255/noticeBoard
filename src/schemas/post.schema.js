const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  contents: String,
  modifyAllowed: Boolean,
  deleteAllowed: Boolean,
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const postSchema = new mongoose.Schema({
  category: String,
  title: String,
  name: String,
  email: String,
  contents: String,
  modifyAllowed: Boolean,
  deleteAllowed: Boolean,
  views: Number,
  likes: Number,
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  comments: [commentSchema],
});

module.exports = { postSchema };
