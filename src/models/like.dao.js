const mongoose = require("mongoose");
const { likeSchema } = require("../schemas/like.schema");
const Like = mongoose.model("like", likeSchema);

const likeAPost = async (email, postId) => {
  try {
    await Like.create({ email, postId });
  } catch (error) {
    throw error;
  }
};

const findALike = async (email, postId) => {
  try {
    const like = await Like.findOne({ email, postId });
    return like;
  } catch (error) {
    throw error;
  }
};

const unlikeAPost = async (email, postId) => {
  try {
    await Like.deleteOne({ email, postId });
  } catch (error) {
    throw error;
  }
};

const retrieveLikes = async (email, postId) => {
  try {
    const likes = await Like.find({ postId });
    return likes;
  } catch (error) {
    throw error;
  }
};

module.exports = { likeAPost, findALike, unlikeAPost, retrieveLikes };
