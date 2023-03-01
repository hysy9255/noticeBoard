const commentDao = require("../models/comment.dao");

const postAComment = async (req, res) => {
  const postId = req.body.postId;
  const author = req.body.author;
  const contents = req.body.contents;

  const comment = await commentDao.insert(postId, author, contents);
  res.status(200).send({ message: "Comment has been inserted", data: comment });
};

const updateAComment = async (req, res) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  const newContents = req.body.newContents;
  const updated = await commentDao.update(postId, commentId, newContents);
  res.status(200).send({ message: "Comment has been updated", data: updated });
};

const deleteAComment = async (req, res) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  const deleted = await commentDao.remove(postId, commentId);
  res.status(200).send({ message: "comment has been deleted", data: deleted });
};

module.exports = { postAComment, updateAComment, deleteAComment };
