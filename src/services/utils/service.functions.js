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

module.exports = { unlikeAPost, likeAPost, determineLikeStatus };
