const mongoose = require("mongoose");
const { likeSchema } = require("../schemas/like.schema");
const { commentLikeSchema } = require("../schemas/commentLike.schema");
const Like = mongoose.model("like", likeSchema);
const commentLike = mongoose.model("commentLike", commentLikeSchema);

const likeAPost = async (accountId, postId, category) => {
  try {
    await Like.create({ accountId, postId, category });
  } catch (error) {
    throw error;
  }
};

const unlikeAPost = async (accountId, postId) => {
  try {
    await Like.deleteOne({ accountId, postId });
  } catch (error) {
    throw error;
  }
};

const findALike = async (accountId, postId) => {
  try {
    return await Like.findOne({ accountId, postId });
  } catch (error) {
    throw error;
  }
};

const retrieveLikes = async (postId) => {
  try {
    return await Like.find({ postId });
  } catch (error) {
    throw error;
  }
};

const retrieveLikesForEachPost = async (category) => {
  try {
    return await Like.aggregate([
      { $match: { category } },
      { $group: { _id: "$postId", count: { $sum: 1 } } },
    ]);
  } catch (error) {
    throw error;
  }
};

// For comment

const likeAComment = async (accountId, postId, commentId, category) => {
  try {
    await commentLike.create({ accountId, postId, commentId, category });
  } catch (error) {
    throw error;
  }
};

const unlikeAComment = async (accountId, postId, commentId) => {
  try {
    await commentLike.deleteOne({ accountId, postId, commentId });
  } catch (error) {
    throw error;
  }
};

const findACommentLike = async (accountId, postId, commentId) => {
  try {
    return await commentLike.findOne({ accountId, postId, commentId });
  } catch (error) {
    throw error;
  }
};

const retrieveCommentLikes = async (postId, commentId) => {
  try {
    return await commentLike.find({ postId, commentId });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  likeAPost,
  unlikeAPost,
  findALike,
  retrieveLikes,
  retrieveLikesForEachPost,
  findACommentLike,
  retrieveCommentLikes,
  likeAComment,
  unlikeAComment,
};
