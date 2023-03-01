const postDao = require("../models/post.dao");

const createAPost = async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const contents = req.body.contents;

  const post = await postDao.insert(title, author, contents);
  res.status(200).send({
    message: "Post has been inserted",
    data: {
      title: post.title,
      author: post.author,
      contents: post.contents,
      _id: post._id,
    },
  });
};

const retriveAPost = async (req, res) => {
  const postId = req.body.postId;
  const post = await postDao.retrive(postId);
  res.status(200).send({ message: "Post has been retrived", data: post });
};

const updateAPost = async (req, res) => {
  const postId = req.body.postId;
  const newTitle = req.body.newTitle;
  const newContents = req.body.newContents;
  const updatedPost = await postDao.update(postId, newTitle, newContents);
  res.status(200).send({ message: "Post has been updated", data: updatedPost });
};

const deleteAPost = async (req, res) => {
  const postId = req.body.postId;
  const deletedPost = await postDao.remove(postId);
  res.status(200).send({ message: "Post has been deleted", data: deletedPost });
};

module.exports = { createAPost, retriveAPost, updateAPost, deleteAPost };
