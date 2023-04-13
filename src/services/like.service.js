const { getUserNames } = require("../utils/superagent.js");
const likeDao = require("../models/like.dao");
// const { getStatus } = require("./utils/service.functions.js");

const pushALike = async (accountId, id, identifier) => {
  let likeExists;
  likeExists = await likeDao.findALike(accountId, id, identifier);
  if (likeExists) {
    await likeDao.deleteALike(accountId, id, identifier);
    return "Deleted like";
  } else {
    await likeDao.createALike(accountId, id, identifier);
    return "Created like";
  }
};

const retrieveLikes = async (accountId, id, identifier) => {
  const likes = await likeDao.retrieveLikes(id, identifier);
  const likesCount = likes.length;

  const likeExists = await likeDao.findALike(accountId, id, identifier);
  const likeStatus = likeExists ? true : false;

  const accountIds = likes.map((doc) => doc.accountId);
  const userNames = await getUserNames(accountIds);

  return [likesCount, likeStatus, userNames];
};

module.exports = {
  pushALike,
  retrieveLikes,
};
