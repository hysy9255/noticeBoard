const mongoose = require("mongoose");
const { postSchema } = require("../schema/post.schema");

const Post = mongoose.model("post", postSchema);

const retriveAll = async () => {
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

const retrive = async (postId) => {
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

module.exports = { insert, retrive, update, remove, retriveAll };
