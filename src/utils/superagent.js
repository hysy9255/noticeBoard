const superagent = require("superagent");

const authServerAddress = "http://localhost:8000/auth/userInfo";
const userPageServerAddress = "http://localhost:5000/userPage/post";

const getUserInfo = async (accountId) => {
  const response = await superagent.get(authServerAddress).query({ accountId });
  return response.body.userInfo;
};

const sendPostToUserPage = async (accountId, post) => {
  await superagent.post(userPageServerAddress).send({ accountId, post });
};

const updatePostFromUserPage = async (accountId, updatedPost) => {
  await superagent
    .patch(userPageServerAddress)
    .send({ accountId, updatedPost });
};

const deletePostFromUserPage = async (accountId, postId) => {
  await superagent.delete(userPageServerAddress).send({ accountId, postId });
};

module.exports = {
  getUserInfo,
  sendPostToUserPage,
  deletePostFromUserPage,
  updatePostFromUserPage,
};
