const { getUserNames } = require("../utils/superagent.js");
const likeDao = require("../models/like.dao");
const {
  createALike,
  deleteALike,
  getStatus,
} = require("./utils/service.functions.js");

const pushALike = async (accountId, postId, commentId) => {
  let likeExists;
  likeExists = await likeDao.findALike(accountId, postId, commentId);
  if (likeExists) {
    await deleteALike(accountId, postId, commentId);
    return "Deleted like";
  } else {
    await createALike(accountId, postId, commentId);
    return "Created like";
  }
};

const retrieveLikes = async (accountId, postId, commentId) => {
  const likes = await likeDao.retrieveLikes(postId, commentId);
  const likesCount = likes.length;

  const likeStatus = await getStatus(accountId, postId, commentId);

  const accountIds = likes.map((doc) => doc.accountId);
  const userNames = await getUserNames(accountIds);

  return [likesCount, likeStatus, userNames];
};

module.exports = {
  pushALike,
  retrieveLikes,
};
