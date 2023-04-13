const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  accountId: { type: String, require: true },
  contents: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = { commentSchema };
