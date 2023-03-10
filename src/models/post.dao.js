const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");

const Post = mongoose.model("post", postSchema);

const retrieveTitlesByCategory = async (category, orderBy, method) => {
  try {
    const posts = await Post.find(
      { category },
      { title: 1, name: 1, createdAt: 1, views: 1, likes: 1 }
    ).sort([[orderBy, method]]);
    return posts;
  } catch (error) {
    throw error;
  }
};

const createAPost = async (category, title, name, email, contents, views) => {
  try {
    const post = await Post.create({
      category,
      title,
      name,
      email,
      contents,
      views,
    });
    return post;
  } catch (error) {
    throw error;
  }
};

const updateViews = async (postId) => {
  try {
    const post = await Post.findById(postId);
    post.views = post.views + 1;
    const updated = await post.save();
    return updated;
  } catch (error) {
    throw error;
  }
};

const retrieveAPost = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    throw error;
  }
};

const updateAPost = async (postId, newTitle, newContents) => {
  try {
    const post = await Post.findById(postId);
    post.title = newTitle;
    post.contents = newContents;
    const updated = await post.save();
    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteAPost = async (postId) => {
  try {
    const deleted = await Post.deleteOne({ _id: postId });
    return deleted;
  } catch (err) {
    console.log(err.message);
  }
};

const findAPost = async (email, postId) => {
  try {
    const exist = await Post.findOne({ email: email, _id: postId });
    return exist;
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

const adminDeleteAPost = async (postId) => {
  try {
    const deleted = await Post.deleteOne({ _id: postId });
    return deleted;
  } catch (error) {
    throw error;
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

module.exports = {
  createAPost,
  retrieveAPost,
  updateViews,
  updateAPost,
  deleteAPost,
  retrieveTitlesByCategory,
  findAPost,
  findCommentFromPost,
  adminDeleteAPost,
  updateLikesCount,
};
