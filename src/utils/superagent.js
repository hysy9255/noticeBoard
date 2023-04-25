const { response } = require("express");
const superagent = require("superagent");

const authServerAddress = "http://localhost:8000";
// const authServerAddress = "http://43.200.7.5:81";
const userPageServerAddress = "http://localhost:5000/userPage/post";

const pathForGettingUserInfo = "/auth/userInfo";
const pathForGettingMultipleUserInfos = "/auth/userInfo/list";
const pathForGettingUserNames = "/auth/userInfo/userNames";
const pathForGettingUserNamesWithId = "/auth/userInfo/userNamesWithId";
const pathForGettingSearchAccount = "/auth/userInfo/search";

const getUserInfo = async (accountId) => {
  const response = await superagent
    .get(authServerAddress + pathForGettingUserInfo)
    .query({ accountId });

  return response.body;
};
// ***
const getMultipleUserInfos = async (accountIds) => {
  const response = await superagent
    .get(authServerAddress + pathForGettingMultipleUserInfos)
    .query({ accountIds });

  return response.body;
};
// ***
const getUserNames = async (accountIds) => {
  const response = await superagent
    .post(authServerAddress + pathForGettingUserNames)
    .send({ accountIds });
  return response.body.userNames;
};

const getUserNamesWithId = async (accountIds) => {
  const response = await superagent
    .post(authServerAddress + pathForGettingUserNamesWithId)
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

const searchAccounts = async (keyword) => {
  const response = await superagent
    .get(authServerAddress + pathForGettingSearchAccount)
    .query({ keyword });

  return response.body;
};

module.exports = {
  getUserInfo,
  getMultipleUserInfos,
  getUserNames,
  sendPostToUserPage,
  deletePostFromUserPage,
  updatePostFromUserPage,
  getUserNamesWithId,
  searchAccounts,
};
