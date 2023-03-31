const superagent = require("superagent");

const authServerAddress = "http://localhost:8000/auth/userInfo";
const userPageServerAddress = "http://localhost:5000/userPage/post";

const getUserInfo = async (accountId) => {
  const response = await superagent.get(authServerAddress).query({ accountId });
  return response.body.userInfo;
};

const sendPostToUserPage = async (accountId, post) => {
  const response = await superagent
    .post(userPageServerAddress)
    .send({ accountId, post });
  return response;
};

const updatePostFromUserPage = async (accountId, updatedPost) => {
  const response = await superagent
    .patch(userPageServerAddress)
    .send({ accountId, updatedPost });
  return response;
};

const deletePostFromUserPage = async (accountId, postId) => {
  const response = await superagent
    .delete(userPageServerAddress)
    .send({ accountId, postId });
  return response;
};

module.exports = {
  getUserInfo,
  sendPostToUserPage,
  deletePostFromUserPage,
  updatePostFromUserPage,
};
