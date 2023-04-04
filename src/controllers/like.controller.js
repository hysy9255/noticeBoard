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

const pushALikeForComment = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const { postId, commentId } = req.body;

  const message = await likeService.pushALikeForComment(
    accountId,
    postId,
    commentId
  );
  res.status(200).send({ message });
});

const retrieveCommentLikes = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const { postId, commentId } = req.body;

  const [likesCount, likeStatus, userNames] =
    await likeService.retrieveCommentLikes(accountId, postId, commentId);

  res.status(200).send({ likesCount, likeStatus, userNames });
});

module.exports = {
  pushALike,
  retrieveLikes,
  pushALikeForComment,
  retrieveCommentLikes,
};
