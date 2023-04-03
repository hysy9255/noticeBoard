const commentDao = require("./../models/comment.dao.js");
const error = require("./utils/service.error.js");

const createAComment = async (userInfo, requestData) => {
  await commentDao.createAComment(userInfo, requestData);
};

const updateAComment = async (accountId, requestData) => {
  const { postId, commentId } = requestData;
  const comment = await commentDao.findAComment(postId, commentId);

  error.checkTheAuthor(accountId, comment);

  await commentDao.updateAComment(requestData);
};

const deleteAComment = async (accountId, requestData, isAdmin) => {
  const { postId, commentId } = requestData;
  const comment = await commentDao.findAComment(postId, commentId);

  if (!isAdmin) {
    error.checkTheAuthor(accountId, comment);
  }

  await commentDao.deleteAComment(requestData);
};

module.exports = { createAComment, updateAComment, deleteAComment };
