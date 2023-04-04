const superagent = require("superagent");

const authServerAddress = "http://localhost:8000";
const userPageServerAddress = "http://localhost:5000/userPage/post";

const pathForGettingUserInfo = "/auth/userInfo";
const pathForGettingUserNames = "/auth/userInfo/userNames";

const getUserInfo = async (accountId) => {
  const response = await superagent
    .get(authServerAddress + pathForGettingUserInfo)
    .query({ accountId });
  return response.body.userInfo;
};

const getUserNames = async (accountIds) => {
  const response = await superagent
    .post(authServerAddress + pathForGettingUserNames)
    .send({ accountIds });
  return response.body.userNames;
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
  getUserNames,
  sendPostToUserPage,
  deletePostFromUserPage,
  updatePostFromUserPage,
};
