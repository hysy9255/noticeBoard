const likeDao = require("../models/like.dao");
// ***
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

module.exports = {
  pushALike,
};
