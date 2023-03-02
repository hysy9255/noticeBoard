const { postSchema } = require("../schema/post.schema");
const { conn1 } = require("./dataSource.js");

const Post = conn1.model("post", postSchema);

const insert = async (postId, author, contents) => {
  try {
    const post = await Post.findById(postId);
    post.comments.push({ author, contents });
    const comment = await post.save();
    return comment;
  } catch (err) {
    console.log(err.message);
  }
};

const update = async (postId, commentId, newContents) => {
  try {
    const post = await Post.findById(postId);
    const comment = post.comments.id(commentId);
    comment.contents = newContents;
    const updated = await post.save();
    return updated;
  } catch (err) {
    console.log(err.message);
  }
};

const remove = async (postId, commentId) => {
  try {
    const post = await Post.findById(postId);
    post.comments.pull({ _id: commentId });
    post.save();
    return post;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { insert, update, remove };
