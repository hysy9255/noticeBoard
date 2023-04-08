const postDao = require("../../models/post.dao");
const likeDao = require("../../models/like.dao");

const createALike = async (accountId, postId, commentId) => {
  await likeDao.createALike(accountId, postId, commentId);
  const likes = await likeDao.retrieveLikes(postId, commentId);
  const likesCount = likes.length;
  if (commentId === undefined) {
    await postDao.updateLikesCount(likesCount, postId);
  } else {
    await postDao.updateCommentLikesCount(likesCount, postId, commentId);
  }
};

const deleteALike = async (accountId, postId, commentId) => {
  await likeDao.deleteALike(accountId, postId, commentId);
  const likes = await likeDao.retrieveLikes(postId, commentId);
  const likesCount = likes.length;
  if (commentId === undefined) {
    await postDao.updateLikesCount(likesCount, postId);
  } else {
    await postDao.updateCommentLikesCount(likesCount, postId, commentId);
  }
};

const getStatus = async (accountId, postId, commentId) => {
  const likeExists = await likeDao.findALike(accountId, postId, commentId);
  return likeExists ? true : false;
};

module.exports = {
  createALike,
  deleteALike,
  getStatus,
};
