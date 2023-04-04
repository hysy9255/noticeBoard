const likeService = require("./../services/like.service.js");
const { asyncWrap } = require("../utils/error.js");

const pushALike = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const postId = req.body.postId;

  const message = await likeService.pushALike(accountId, postId);
  res.status(200).send({ message });
});

const retrieveLikes = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const postId = req.body.postId;

  const [likesCount, likeStatus, userNames] = await likeService.retrieveLikes(
    accountId,
    postId
  );

  res.status(200).send({ likesCount, likeStatus, userNames });
});

module.exports = { pushALike, retrieveLikes };
