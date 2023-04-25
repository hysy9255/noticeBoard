const commentDao = require("./../models/comment.dao.js");
const likeDao = require("../models/like.dao");
const alertDao = require("../models/alert.dao");
const postDao = require("../models/post.dao");
const error = require("./utils/service.error.js");
const { getMultipleUserInfos, getUserNames } = require("../utils/superagent");
const { reconstructObject } = require("./utils/service.functions.js");
// ***
const createAComment = async (accountId, requestData) => {
  const { postId } = requestData;
  await commentDao.createAComment(accountId, requestData);
  const postAuthorId = await postDao.getPostAuthorId(postId);
  if (postAuthorId !== accountId) {
    const [userName] = await getUserNames([accountId]);
    const [post] = await postDao.retrieveAPost(postId);
    await alertDao.createAlert.forComment(
      accountId,
      userName,
      postId,
      post.title,
      post.accountId
    );
  }
};
// ***
const updateAComment = async (accountId, requestData) => {
  const { commentId } = requestData;
  const comment = await commentDao.findAComment(commentId);
  error.checkTheAuthor(accountId, comment);
  await commentDao.updateAComment(requestData);
};
// ***
const deleteAComment = async (isAdmin, requestData, accountId) => {
  const { commentId } = requestData;
  const comment = await commentDao.findAComment(commentId);
  if (!isAdmin) error.checkTheAuthor(accountId, comment);
  await commentDao.deleteAComment(requestData);
};
// ***
const retrieveComments = async (loggedInUserId, postId) => {
  // 1) 주어진 게시물에 해당되는 댓글을 모두 가져온다.
  const comments = await commentDao.retrieveComments(postId);
  // 2) 댓글 작성자의 정보를 가져온다.
  const authorIds = comments.map((doc) => doc.accountId);
  const authorInfos = await getMultipleUserInfos(authorIds);
  // 3) 댓글의 좋아요 갯수와 좋아요를 누른 회원의 정보를 가져온다.
  const commentIds = comments.map((doc) => doc.commentId.toString());
  const commentLikes = await likeDao.retrieveLikesForComments(commentIds);
  for (let i = 0; i < commentLikes.length; i++) {
    commentLikes[i].users = await getUserNames(commentLikes[i].users);
  }
  // 4) 로그인한 회원이 좋아요를 누른 댓글 아이디를 가져온다.
  const likeExists = await likeDao.findALikeForComments(
    loggedInUserId,
    commentIds
  );

  const merged = [];
  for (let i = 0; i < comments.length; i++) {
    merged.push({
      ...comments[i],
      ...authorInfos.find((elem) => elem.accountId === comments[i].accountId),
    });
  }

  const merged2 = [];
  for (let i = 0; i < merged.length; i++) {
    merged2.push({
      ...merged[i],
      ...commentLikes.find(
        (doc) => doc.commentId === merged[i].commentId.toString()
      ),
    });
    let condition = likeExists.find(
      (doc) => doc.commentId === merged[i].commentId.toString()
    );
    if (condition) merged2[i].likeStatus = true;
    else merged2[i].likeStatus = false;

    if (loggedInUserId === merged[i].accountId)
      [merged2[i].modifyAllowed, merged2[i].deleteAllowed] = [true, true];
    else [merged2[i].modifyAllowed, merged2[i].deleteAllowed] = [false, false];
  }

  return reconstructObject(merged2);
};

module.exports = {
  createAComment,
  updateAComment,
  retrieveComments,
  deleteAComment,
};
