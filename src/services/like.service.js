const { getUserNames } = require("../utils/superagent.js");
const likeDao = require("./../models/like.dao.js");
const postDao = require("./../models/post.dao.js");
const {
  unlikeAPost,
  likeAPost,
  determineLikeStatus,
  likeAComment,
  unlikeAComment,
  determineCommentLikeStatus,
} = require("./utils/service.functions.js");

const pushALike = async (accountId, postId) => {
  const post = await postDao.retrieveAPost(postId);
  const category = post.category;

  const likeExists = await likeDao.findALike(accountId, postId);
  if (likeExists) {
    await unlikeAPost(accountId, postId);
    return "Deleted like for the post";
  } else {
    await likeAPost(accountId, postId, category);
    return "Created like for the post";
  }
};

const retrieveLikes = async (accountId, postId) => {
  const likes = await likeDao.retrieveLikes(postId);
  const likesCount = likes.length;

  const likeStatus = await determineLikeStatus(accountId, postId);

  const accountIds = likes.map((doc) => doc.accountId);
  const userNames = await getUserNames(accountIds);

  return [likesCount, likeStatus, userNames];
};

const pushALikeForComment = async (accountId, postId, commentId) => {
  const post = await postDao.retrieveAPost(postId);
  const category = post.category;

  const likeExists = await likeDao.findALikeForComment(
    accountId,
    postId,
    commentId
  );
  if (likeExists) {
    await unlikeAComment(accountId, postId, commentId);
    return "Deleted like for the comment";
  } else {
    await likeAComment(accountId, postId, commentId, category);
    return "Created like for the comment";
  }
};

const retrieveCommentLikes = async (accountId, postId, commentId) => {
  const likes = await likeDao.retrieveCommentLikes(postId, commentId);
  const likesCount = likes.length;

  const likeStatus = await determineCommentLikeStatus(
    accountId,
    postId,
    commentId
  );

  const accountIds = likes.map((doc) => doc.accountId);
  const userNames = await getUserNames(accountIds);

  return [likesCount, likeStatus, userNames];
};

module.exports = {
  pushALike,
  retrieveLikes,
  pushALikeForComment,
  retrieveCommentLikes,
};
