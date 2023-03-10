const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  email: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

likeSchema.index({ postId: 1, email: 1 }, { unique: true });

module.exports = { likeSchema };
