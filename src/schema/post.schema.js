const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: String,
  contents: String,
});

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  contents: String,
  comments: [commentSchema],
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = { postSchema };
