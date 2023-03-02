const { postSchema } = require("../schema/post.schema");
const { conn1 } = require("./dataSource.js");

const Post = conn1.model("post", postSchema);

const retrieveAll = async () => {
  try {
    const posts = await Post.find({}, { title: 1, author: 1 });
    return posts;
  } catch (err) {
    console.log(err.message);
  }
};

const insert = async (title, author, contents) => {
  try {
    const post = await Post.create({
      title,
      author,
      contents,
    });
    return post;
  } catch (err) {
    console.log(err.message);
  }
};

const retrieve = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (err) {
    console.log(err.message);
  }
};

const update = async (postId, newTitle, newContents) => {
  try {
    const post = await Post.findById(postId);
    post.title = newTitle;
    post.contents = newContents;
    const updated = await post.save();
    return updated;
  } catch (err) {
    console.log(err.message);
  }
};

const remove = async (postId) => {
  try {
    const deleted = await Post.deleteOne({ _id: postId });
    return deleted;
  } catch (err) {
    console.log(err.message);
  }
};

const findPost = async (email, postId) => {
  try {
    const exist = await Post.findOne({ email: email, postId: postId });
    return exist;
  } catch (error) {
    console.log(error.message);
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

module.exports = {
  insert,
  retrieve,
  update,
  remove,
  retrieveAll,
  findPost,
  findCommentFromPost,
};
