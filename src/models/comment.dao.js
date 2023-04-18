const mongoose = require("mongoose");
const { commentSchema } = require("../schemas/comment.schema");
const Comment = mongoose.model("comment", commentSchema);
// ***
const createAComment = async (accountId, requestData) => {
  const { postId, contents } = requestData;
  try {
    await Comment.create({ accountId, postId, contents });
  } catch (error) {
    throw error;
  }
};
// ***
const findAComment = async (commentId) => {
  try {
    return await Comment.findById(commentId);
  } catch (error) {
    throw error;
  }
};
// ***
const updateAComment = async (requestData) => {
  const { commentId, newContents } = requestData;
  try {
    const comment = await Comment.findById(commentId);
    comment.contents = newContents;
    await comment.save();
  } catch (error) {
    throw error;
  }
};
// ***
const deleteAComment = async (requestData) => {
  const { commentId } = requestData;
  try {
    await Comment.deleteOne({ _id: commentId });
  } catch (error) {
    throw error;
  }
};
// ***
const retrieveComments = async (postId) => {
  const agg = [
    { $match: { postId } },
    { $addFields: { commentId: "$_id" } },
    { $project: { _id: 0, postId: 0, __v: 0 } },
  ];
  try {
    return await Comment.aggregate(agg);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAComment,
  updateAComment,
  deleteAComment,
  findAComment,
  retrieveComments,
};
