const commentService = require("./../services/comment.service.js");

const { getUserInfo } = require("./../utils/communication.js");

const createAComment = async (req, res) => {
  const accountId = res.local.accountId;
  // 인증|인가 서버로부터 유저 정보 가져오기
  const userInfo = await getUserInfo(accountId);
  const requestData = req.body;
  await commentService.createAComment(userInfo, requestData);
  res.status(200).send({ message: "Comment has been created" });
};

const updateAComment = async (req, res) => {
  const updatedComment = await commentService.updateAComment(
    res.locals.email,
    req.body.postId,
    req.body.commentId,
    req.body.newContents
  );
  res.status(200).send({
    message: "Comment has been updated",
    data: updatedComment,
  });
};

const deleteAComment = async (req, res) => {
  const deletedComment = await commentService.deleteAComment(
    res.locals.email,
    req.body.postId,
    req.body.commentId
  );
  res
    .status(200)
    .send({ message: "comment has been deleted", data: deletedComment });
};

const adminDeleteAComment = async (req, res) => {};

module.exports = {
  createAComment,
  updateAComment,
  deleteAComment,
  adminDeleteAComment,
};
