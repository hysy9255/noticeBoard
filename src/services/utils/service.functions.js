const postDao = require("../../models/post.dao");
const likeDao = require("../../models/like.dao");

const unlikeAPost = async (accountId, postId) => {
  await likeDao.unlikeAPost(accountId, postId);
  const likes = await likeDao.retrieveLikes(postId);
  const likesCount = likes.length;
  await postDao.updateLikesCount(postId, likesCount);
};

const likeAPost = async (accountId, postId, category) => {
  await likeDao.likeAPost(accountId, postId, category);
  const likes = await likeDao.retrieveLikes(postId);
  const likesCount = likes.length;
  await postDao.updateLikesCount(postId, likesCount);
};

const determineLikeStatus = async (accountId, postId) => {
  const likeExists = await likeDao.findALike(accountId, postId);
  return likeExists ? true : false;
};

const likeAComment = async (accountId, postId, commentId, category) => {
  await likeDao.likeAComment(accountId, postId, commentId, category);
  const commentLikes = await likeDao.retrieveCommentLikes(postId, commentId);
  const commentLikesCount = commentLikes.length;
  await postDao.updateCommentLikesCount(postId, commentId, commentLikesCount);
};

const unlikeAComment = async (accountId, postId, commentId) => {
  await likeDao.unlikeAComment(accountId, postId, commentId);
  const commentLikes = await likeDao.retrieveCommentLikes(postId, commentId);
  const commentLikesCount = commentLikes.length;
  await postDao.updateCommentLikesCount(postId, commentId, commentLikesCount);
};

const determineCommentLikeStatus = async (accountId, postId, commentId) => {
  const likeExists = await likeDao.findACommentLike(
    accountId,
    postId,
    commentId
  );
  return likeExists ? true : false;
};

module.exports = {
  unlikeAPost,
  likeAPost,
  determineLikeStatus,
  likeAComment,
  unlikeAComment,
  determineCommentLikeStatus,
};
