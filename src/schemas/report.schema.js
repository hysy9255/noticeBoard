const mongoose = require("mongoose");

const reportedPostSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

const reportedCommentSchema = new mongoose.Schema({
  commentId: { type: String, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

module.exports = {
  postSchema: reportedPostSchema,
  commentSchema: reportedCommentSchema,
};
