const { getUserNames } = require("../utils/superagent.js");
const likeDao = require("./../models/like.dao.js");
const postDao = require("./../models/post.dao.js");
const {
  unlikeAPost,
  likeAPost,
  determineLikeStatus,
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

module.exports = { pushALike, retrieveLikes };
