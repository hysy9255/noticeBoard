const postDao = require("../models/post.dao");
const likeDao = require("../models/like.dao");
const jwt = require("jsonwebtoken");
const error = require("./utils/service.error");
const { getUserInfo } = require("../utils/superagent");
const { getUserNames } = require("../utils/superagent");
require("dotenv").config({ path: "./../../env/.env" });

const retrievePosts = async (requestData) => {
  return await postDao.retrievePosts(requestData);
};

const retrieveUserPosts = async (requestData) => {
  return await postDao.retrieveUserPosts(requestData);
};

const createAPost = async (accountId, requestData) => {
  return await postDao.createAPost(accountId, requestData);
};

const retrieveAPost = async (postId, loggedInUserId) => {
  await postDao.updateViews(postId);
  // post 객체
  // 게시물 가져오기
  const [post] = await postDao.retrieveAPost(postId);
  // 해당 게시물에 해당되는 좋아요 가져와서 갯수를 계산 후 게시물 객체에 할당
  const likes = await likeDao.retrieveLikesForPost(postId);
  post.likes = likes.length;
  // 좋아요를 누른 계정들의 이름들을 auth 서버로부터 가져온 후 게시물 객체에 할당
  const accountIds = likes.map((doc) => doc.accountId);
  const userNames = await getUserNames(accountIds);
  post.usersWhoLiked = userNames;

  // author 객체
  // auth 서버로부터 게시물 작성자의 정보를 가져오기
  const authorId = post.accountId;
  delete post.accountId;
  const author = await getUserInfo(authorId.toString());
  author.authorId = authorId;

  // user 객체
  // 로그인한 현 사용자가 해당 게시물에 좋아요를 눌렀는지 확인
  const user = {};
  const likeExists = await likeDao.findALike(loggedInUserId, postId, "post");
  user.likeStatus = likeExists ? true : false;
  // 로그인한 현 사용자와 게시물의 작성자와 일치하면 게시물 수정 가능
  const allowed = { deleteAllowed: true, modfifyAllowed: true };
  const disallowed = { deleteAllowed: false, modfifyAllowed: false };
  !loggedInUserId
    ? Object.assign(user, disallowed)
    : loggedInUserId !== authorId
    ? Object.assign(user, disallowed)
    : Object.assign(user, allowed);

  return { post, author, user };
};

const updateAPost = async (accountId, requestData) => {
  const { postId } = requestData;
  const post = await postDao.retrieveAPost(postId);

  error.checkTheAuthor(accountId, post);

  return await postDao.updateAPost(requestData);
};

const deleteAPost = async (accountId, postId, isAdmin) => {
  const post = await postDao.retrieveAPost(postId);

  if (!isAdmin) {
    error.checkTheAuthor(accountId, post);
  }

  await postDao.deleteAPost(postId);
};

module.exports = {
  retrievePosts,
  retrieveUserPosts,
  updateAPost,
  deleteAPost,
  createAPost,
  retrieveAPost,
};
