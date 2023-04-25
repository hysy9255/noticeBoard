const mongoose = require("mongoose");

const commentAlert = new mongoose.Schema({
  accountId: { type: String, require: true },
  userName: { type: String, require: true },
  postId: { type: String, require: true },
  title: { type: String, require: true },
  authorId: { type: String, require: true },
  readStatus: { type: Boolean, require: true, default: false },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

module.exports = { commentAlert };
