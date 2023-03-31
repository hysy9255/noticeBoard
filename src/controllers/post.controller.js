const postService = require("./../services/post.service.js");
const {
  getUserInfo,
  sendPostToUserPage,
  updatePostFromUserPage,
  deletePostFromUserPage,
} = require("./../utils/communication.js");

const retrievePosts = async (req, res) => {
  const requestData = req.query;
  const posts = await postService.retrievePosts(requestData);
  res.status(200).json({ posts });
};

const createAPost = async (req, res) => {
  const accountId = res.locals.accountId;
  // 인증|인가 서버로부터 유저 정보 가져오기
  const userInfo = await getUserInfo(accountId);
  // 유저정보와 함께 게시물 생성하기
  const requestData = req.body;
  const post = await postService.createAPost(accountId, userInfo, requestData);
  // 생성된 게시물을 유저페이지 서버에 보내기
  const resFromUserPageServer = await sendPostToUserPage(accountId, post);
  if (resFromUserPageServer.body.message === "Successfully posted") {
    res.status(200).send({ message: "Post has been created" });
  }
};

const retrieveAPost = async (req, res) => {
  const token = req.headers.authorization;
  const postId = req.query.postId;
  const post = token
    ? await postService.retrieveAPost(token, postId)
    : await postService.retrieveAPost(postId);
  res.status(200).send({ post });
};

const updateAPost = async (req, res) => {
  const accountId = res.locals.accountId;
  // 게시물 수정하기
  const requestData = req.body;
  const updatedPost = await postService.updateAPost(accountId, requestData);
  // 생성된 게시물을 유저페이지 서버에 보내기
  const response = await updatePostFromUserPage(accountId, updatedPost);
  if (response.body.message === "Successfully updated") {
    res.status(200).send({ message: "Post has been edited" });
  }
};

const deleteAPost = async (req, res) => {
  const accountId = res.locals.accountId;
  const postId = req.body.postId;
  await postService.deleteAPost(accountId, postId);
  const response = await deletePostFromUserPage(accountId, postId);
  if (response.body.message === "Successfully deleted") {
    res.status(200).send({ message: "Post has been deleted" });
  }
};

const adminDeleteAPost = async (req, res) => {
  const { accountId, postId } = req.body;
  await postService.deleteAPost(postId);
  const response = await deletePostFromUserPage(accountId, postId);
  if (response.body.message === "Successfully deleted") {
    res.status(200).send({ message: "Post has been deleted" });
  }
};

module.exports = {
  retrievePosts,
  createAPost,
  retrieveAPost,
  updateAPost,
  deleteAPost,
  adminDeleteAPost,
};
