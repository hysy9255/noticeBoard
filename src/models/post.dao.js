const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");

const Post = mongoose.model("post", postSchema);

const retrievePosts = async (requestData) => {
  const { subCategory, orderBy, method } = requestData;
  try {
    return await Post.find(
      { subCategory },
      { _id: 1, title: 1, name: 1, createdAt: 1, views: 1, likes: 1 }
    ).sort([[orderBy, method]]);
  } catch (error) {
    throw error;
  }
};

const createAPost = async (accountId, userInfo, requestData) => {
  const views = 0;
  const { name, email } = userInfo;
  const { mainCategory, subCategory, title, contents } = requestData;
  try {
    return await Post.create({
      accountId,
      mainCategory,
      subCategory,
      title,
      name,
      email,
      contents,
      views,
    });
  } catch (error) {
    throw error;
  }
};

const updateViews = async (postId) => {
  try {
    const post = await Post.findById(postId);
    post.views = post.views + 1;
    await post.save();
  } catch (error) {
    throw error;
  }
};

const retrieveAPost = async (postId) => {
  try {
    return await Post.findById(postId);
  } catch (error) {
    throw error;
  }
};

const updateAPost = async (requestData) => {
  const { postId, newTitle, newContents } = requestData;
  try {
    const post = await Post.findById(postId);
    post.title = newTitle;
    post.contents = newContents;
    return await post.save();
  } catch (error) {
    throw error;
  }
};

const deleteAPost = async (postId) => {
  try {
    await Post.deleteOne({ _id: postId });
  } catch (error) {
    throw error;
  }
};

const findCommentFromPost = async (postId, commentId) => {
  try {
    const post = await Post.findById(postId);
    const comment = post.comments.id(commentId);
    return comment;
  } catch (error) {
    console.log(error.message);
  }
};

const updateLikesCount = async (postId, likesCount) => {
  try {
    const post = await Post.findById(postId);
    post.likes = likesCount;
    post.save();
  } catch (error) {
    throw error;
  }
};

const updateCommentLikesCount = async (
  postId,
  commentId,
  commentLikesCount
) => {
  try {
    const post = await Post.findById(postId);
    const comment = post.comments.id(commentId);
    comment.likes = commentLikesCount;
    post.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrievePosts,
  createAPost,
  retrieveAPost,
  updateViews,
  updateAPost,
  deleteAPost,
  findCommentFromPost,
  updateLikesCount,
  updateCommentLikesCount,
};
