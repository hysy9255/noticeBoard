const mongoose = require("mongoose");
const { postSchema, commentSchema } = require("../schemas/report.schema.js");

const ReportedPost = mongoose.model("reportedPost", postSchema);
const ReportedComment = mongoose.model("reportedComment", commentSchema);

const postDao = {
  report: async (postId) => {
    await ReportedPost.create({ postId });
  },
  showReports: async () => {
    return await ReportedPost.find({});
  },
};

const commentDao = {
  report: async (postId, commentId) => {
    await ReportedComment.create({ postId, commentId });
  },
  showReports: async () => {
    return await ReportedComment.find({});
  },
};

module.exports = { postDao, commentDao };
