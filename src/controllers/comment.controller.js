const commentService = require("./../services/comment.service.js");
const { asyncWrap } = require("./../utils/error.js");
const { getUserInfo } = require("../utils/superagent.js");

const createAComment = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;

  const userInfo = await getUserInfo(accountId);

  await commentService.createAComment(userInfo, requestData);

  res.status(201).send({ message: "Comment has been created" });
});

const updateAComment = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;

  await commentService.updateAComment(accountId, requestData);
  res.status(200).send({ message: "Comment has been updated" });
});

const deleteAComment = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;

  await commentService.deleteAComment(accountId, requestData);
  res.status(200).send({ message: "comment has been deleted" });
});

const adminDeleteAComment = asyncWrap(async (req, res) => {
  const { adminAcctId, isAdmin } = res.locals;
  const requestData = req.body;

  await commentService.deleteAComment(adminAcctId, requestData, isAdmin);

  res.status(200).json({ message: "Admin has deleted the comment" });
});

module.exports = {
  createAComment,
  updateAComment,
  deleteAComment,
  adminDeleteAComment,
};
