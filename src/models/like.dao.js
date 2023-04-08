const mongoose = require("mongoose");
const { likeSchema } = require("../schemas/like.schema");
const { commentLikeSchema } = require("../schemas/commentLike.schema");
const Like = mongoose.model("like", likeSchema);
const commentLike = mongoose.model("commentLike", commentLikeSchema);

const createALike = async (accountId, postId, commentId) => {
  try {
    if (commentId === undefined) {
      await Like.create({ accountId, postId });
    } else {
      await commentLike.create({ accountId, postId, commentId });
    }
  } catch (error) {
    throw error;
  }
};

const deleteALike = async (accountId, postId, commentId) => {
  try {
    if (commentId === undefined) {
      await Like.deleteOne({ accountId, postId });
    } else {
      await commentLike.deleteOne({ accountId, postId, commentId });
    }
  } catch (error) {
    throw error;
  }
};

const retrieveLikes = async (postId, commentId) => {
  try {
    if (commentId === undefined) {
      return await Like.find({ postId });
    } else {
      return await commentLike.find({ postId, commentId });
    }
  } catch (error) {
    throw error;
  }
};

const findALike = async (accountId, postId, commentId) => {
  try {
    if (commentId === undefined) {
      return await Like.findOne({ accountId, postId });
    } else {
      return await commentLike.findOne({ accountId, postId, commentId });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createALike,
  deleteALike,
  retrieveLikes,
  findALike,
};
