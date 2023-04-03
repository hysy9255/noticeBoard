const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");
const Post = mongoose.model("post", postSchema);

const createAComment = async (userInfo, requestData) => {
  const { name, email, _id } = userInfo;
  const { postId, contents } = requestData;
  const accountId = _id;

  try {
    const post = await Post.findById(postId);
    post.comments.push({ accountId, email, name, contents });
    await post.save();
  } catch (error) {
    throw error;
  }
};

const updateAComment = async (requestData) => {
  const { postId, commentId, newContents } = requestData;

  try {
    const post = await Post.findById(postId);
    const comment = post.comments.id(commentId);

    comment.contents = newContents;
    await post.save();
  } catch (error) {
    throw error;
  }
};

const deleteAComment = async (requestData) => {
  const { postId, commentId } = requestData;

  try {
    const post = await Post.findById(postId);

    post.comments.pull({ _id: commentId });
    post.save();
  } catch (error) {
    throw error;
  }
};

const findAComment = async (postId, commentId) => {
  try {
    const post = await Post.findById(postId);
    return post.comments.id(commentId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAComment,
  updateAComment,
  deleteAComment,
  findAComment,
};
