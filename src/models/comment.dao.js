const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");

const Post = mongoose.model("post", postSchema);

const createAComment = async (userInfo, requestData) => {
  const { name, email, _id } = userInfo;
  const accountId = _id;
  const { postId, contents } = requestData;
  try {
    const post = await Post.findById(postId);
    if (post === null) {
      throw new Error("해당 postId를 가진 게시물이 없습니다.");
    }
    post.comments.push({ accountId, email, name, contents });
    await post.save();
  } catch (error) {
    throw error;
  }
};

const updateAComment = async (postId, commentId, newContents) => {
  try {
    const post = await Post.findById(postId);
    const comment = post.comments.id(commentId);
    comment.contents = newContents;
    const updatedPost = await post.save();
    return updatedPost.comments.id(commentId);
  } catch (error) {
    throw error;
  }
};

const deleteAComment = async (postId, commentId) => {
  try {
    const post = await Post.findById(postId);
    console.log(post);
    post.comments.pull({ _id: commentId });
    post.save();
    return post;
  } catch (error) {
    throw error;
  }
};

const findAComment = async (postId, commentId) => {
  try {
    const post = await Post.findById(postId);
    const comment = post.comments.id(commentId);
    return comment;
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
