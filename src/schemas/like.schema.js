const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  accountId: { type: String, require: true },
  category: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

likeSchema.index({ postId: 1, accountId: 1 }, { unique: true });

module.exports = { likeSchema };
