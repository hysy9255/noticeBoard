const mongoose = require("mongoose");

const commentLikeSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  commentId: { type: String, require: true },
  accountId: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

commentLikeSchema.index(
  { postId: 1, commentId: 1, accountId: 1 },
  { unique: true }
);

module.exports = { commentLikeSchema };
