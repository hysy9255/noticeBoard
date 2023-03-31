const postDao = require("../models/post.dao");
const jwt = require("jsonwebtoken");
const { detectError } = require("./../utils/error.js");
require("dotenv").config({ path: "./../../env/.env" });

const retrievePosts = async (requestData) => {
  const posts = await postDao.retrievePosts(requestData);
  return posts;
};

const createAPost = async (accountId, userInfo, requestData) => {
  return await postDao.createAPost(accountId, userInfo, requestData);
};

const retrieveAPost = async (token, postId) => {
  await postDao.updateViews(postId);
  const post = await postDao.retrieveAPost(postId);

  if (!token) {
    return post;
  }

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    const { accountId } = decodedToken;

    if (accountId === post.accountId) {
      post.deleteAllowed = true;
      post.modifyAllowed = true;
    }

    for (let i = 0; i < post.comments.length; i++) {
      if (post.comments[i].accountId === accountId) {
        post.comments[i].modifyAllowed = true;
        post.comments[i].deleteAllowed = true;
      }
    }
    return post;
  }
};

const retrieveAPostNoToken = async (postId) => {
  try {
    await postDao.updateViews(postId);
    const post = await postDao.retrieveAPost(postId);
    post.deleteAllowed = false;
    post.modifyAllowed = false;
    for (let i = 0; i < post.comments.length; i++) {
      post.comments[i].modifyAllowed = false;
      post.comments[i].deleteAllowed = false;
    }
    return post;
  } catch (error) {
    throw error;
  }
};

const updateAPost = async (accountId, requestData) => {
  const { postId } = requestData;
  // retrieveAPost에서 자신이 작성한것만 수정 가능케 해놓았지만
  // updateAPost에서도 한번더 중복으로 검사를 한다. (API 서버에 직접 삭제 요청을 할 수 있기 때문)
  const post = await postDao.findAPost(postId);
  if (post.accountId !== accountId) {
    detectError("자신이 작성한 게시물만 수정/삭제 가능", 400);
  }
  return await postDao.updateAPost(requestData);
};

const deleteAPost = async (accountId, postId) => {
  // retrieveAPost에서 자신이 작성한것만 삭제 가능케 해놓았지만
  // updateAPost에서도 한번더 중복으로 검사를 한다. (API 서버에 직접 삭제 요청을 할 수 있기 때문)
  const post = await postDao.findAPost(postId);
  if (post.accountId !== accountId) {
    detectError("자신이 작성한 게시물만 수정/삭제 가능", 400);
  }
  await postDao.deleteAPost(postId);
};

const adminDeleteAPost = async (postId) => {
  await postDao.deletaAPost(postId);
};

module.exports = {
  retrievePosts,
  updateAPost,
  deleteAPost,
  adminDeleteAPost,
  createAPost,
  retrieveAPost,
  retrieveAPostNoToken,
};
