const commentService = require("./../services/comment.service.js");
const { asyncWrap } = require("./../utils/error.js");
// ***
const createAComment = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;
  await commentService.createAComment(accountId, requestData);
  res.status(201).send({ message: "Comment has been created" });
});
// ***
const updateAComment = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;
  await commentService.updateAComment(accountId, requestData);
  res.status(200).send({ message: "Comment has been updated" });
});
// ***
const deleteAComment = asyncWrap(async (req, res) => {
  const { isAdmin, accountId } = res.locals;
  const requestData = req.body;
  await commentService.deleteAComment(isAdmin, requestData, accountId);
  res.status(200).send({ message: "comment has been deleted" });
});
// ***
const adminDeleteAComment = asyncWrap(async (req, res) => {
  const { isAdmin } = res.locals;
  const requestData = req.body;
  await commentService.deleteAComment(isAdmin, requestData);
  res.status(200).json({ message: "Admin has deleted the comment" });
});
// ***
const retrieveComments = asyncWrap(async (req, res) => {
  const loggedInUserId = res.locals.accountId;
  const { postId } = req.query;
  const comments = await commentService.retrieveComments(
    loggedInUserId,
    postId
  );
  res.status(200).send(comments);
});

module.exports = {
  createAComment,
  updateAComment,
  deleteAComment,
  retrieveComments,
  adminDeleteAComment,
};
