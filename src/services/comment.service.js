const commentDao = require("./../models/comment.dao.js");
const likeDao = require("../models/like.dao");
const error = require("./utils/service.error.js");
const { getMultipleUserInfos } = require("../utils/superagent");
const { getUserNames } = require("../utils/superagent");
const { ObjectId } = require("mongodb");
const { reconstructObject } = require("./utils/service.functions.js");

const createAComment = async (accountId, requestData) => {
  await commentDao.createAComment(accountId, requestData);
};

const updateAComment = async (accountId, requestData) => {
  const { commentId } = requestData;
  const comment = await commentDao.findAComment(commentId);

  error.checkTheAuthor(accountId, comment);

  await commentDao.updateAComment(requestData);
};

const retrieveComments = async (loggedInUserId, postId) => {
  // 1) 주어진 게시물에 해당되는 댓글을 모두 가져온다.
  const comments = await commentDao.retrieveComments(postId);
  // 2) 댓글 작성자의 정보를 가져온다.
  const authorIds = comments.map((doc) => doc.accountId);
  const authorInfos = await getMultipleUserInfos(authorIds);
  // 1) + 2)
  const merged = [];
  for (let i = 0; i < comments.length; i++) {
    merged.push({
      ...comments[i],
      ...authorInfos.find((elem) => elem.accountId === comments[i].accountId),
    });
  }
  // 3) 로그인한 회원이 좋아요를 누를 댓글 아이디를 가져온다.
  const commentIds = comments.map((doc) => doc.commentId.toString());
  const likeExists = await likeDao.findALikeForComments(
    loggedInUserId,
    commentIds
  );
  // + 3)
  for (let i = 0; i < merged.length; i++) {
    if (
      likeExists.find((doc) => doc.commentId === merged[i].commentId.toString())
    ) {
      merged[i].likeStatus = true;
    } else {
      merged[i].likeStatus = false;
    }
  }
  // 4) 댓글의 좋아요 갯수와 좋아요를 누른 회원의 정보를 가져온다.
  const commentLikes = await likeDao.retrieveLikesForComments(commentIds);
  for (let i = 0; i < commentLikes.length; i++) {
    commentLikes[i].users = await getUserNames(commentLikes[i].users);
  }
  // + 4)
  const merged2 = [];
  for (let i = 0; i < merged.length; i++) {
    merged2.push({
      ...merged[i],
      ...commentLikes.find(
        (doc) => doc.commentId === merged[i].commentId.toString()
      ),
    });
  }

  for (let i = 0; i < merged2.length; i++) {
    if (loggedInUserId === merged2[i].accountId) {
      merged2[i].modifyAllowed = true;
      merged2[i].deleteAllowed = true;
    } else {
      merged2[i].modifyAllowed = false;
      merged2[i].deleteAllowed = false;
    }
  }

  return reconstructObject(merged2);
};

const deleteAComment = async (accountId, requestData, isAdmin) => {
  const { commentId } = requestData;
  const comment = await commentDao.findAComment(commentId);

  if (!isAdmin) {
    error.checkTheAuthor(accountId, comment);
  }

  await commentDao.deleteAComment(requestData);
};

module.exports = {
  createAComment,
  updateAComment,
  retrieveComments,
  deleteAComment,
};
