const likeService = require("./../services/like.service.js");
const { asyncWrap } = require("../utils/error.js");
// ***
const post = {
  pushALike: asyncWrap(async (req, res) => {
    const { accountId } = res.locals;
    const { postId } = req.body;
    const message = await likeService.pushALike(accountId, postId, "post");
    res.status(200).send({ message });
  }),
};
// ***
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
};

module.exports = {
  post,
  comment,
};
