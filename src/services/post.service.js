const postDao = require("../models/post.dao");
const jwt = require("jsonwebtoken");
const error = require("./utils/service.error");
require("dotenv").config({ path: "./../../env/.env" });

const retrievePosts = async (requestData) => {
  return await postDao.retrievePosts(requestData);
};

const createAPost = async (accountId, userInfo, requestData) => {
  return await postDao.createAPost(accountId, userInfo, requestData);
};

const retrieveAPost = async (postId, token) => {
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
  updateAPost,
  deleteAPost,
  createAPost,
  retrieveAPost,
};
