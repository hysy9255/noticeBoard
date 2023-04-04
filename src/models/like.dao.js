const mongoose = require("mongoose");
const { likeSchema } = require("../schemas/like.schema");
const Like = mongoose.model("like", likeSchema);

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
    console.log(accountId);
    console.log(postId);
    const like = await Like.findOne({ accountId, postId });
    return like;
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

module.exports = {
  likeAPost,
  unlikeAPost,
  findALike,
  retrieveLikes,
  retrieveLikesForEachPost,
};
