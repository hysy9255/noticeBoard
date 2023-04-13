const likeService = require("./../services/like.service.js");
const { asyncWrap } = require("../utils/error.js");

const post = {
  pushALike: asyncWrap(async (req, res) => {
    const { accountId } = res.locals;
    const { postId } = req.body;

    const message = await likeService.pushALike(accountId, postId, "post");
    res.status(200).send({ message });
  }),

  retrieveLikes: asyncWrap(async (req, res) => {
    const { accountId } = res.locals;
    const { postId } = req.query;

    const [likesCount, likeStatus, userNames] = await likeService.retrieveLikes(
      accountId,
      postId,
      "post"
    );

    res.status(200).send({ likesCount, likeStatus, userNames });
  }),
};

const comment = {
  pushALike: asyncWrap(async (req, res) => {
    const { accountId } = res.locals;
    const { commentId } = req.body;

    const message = await likeService.pushALike(
      accountId,
      commentId,
      "comment"
    );
    res.status(200).send({ message });
  }),

  retrieveLikes: asyncWrap(async (req, res) => {
    const { accountId } = res.locals;
    const { commentId } = req.query;

    const [likesCount, likeStatus, userNames] = await likeService.retrieveLikes(
      accountId,
      commentId,
      "comment"
    );

    res.status(200).send({ likesCount, likeStatus, userNames });
  }),
};

module.exports = {
  post,
  comment,
};
