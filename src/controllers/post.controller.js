const postService = require("./../services/post.service.js");
const { asyncWrap } = require("./../utils/error.js");
const {
  getUserInfo,
  sendPostToUserPage,
  updatePostFromUserPage,
  deletePostFromUserPage,
} = require("../utils/superagent.js");

const retrievePosts = asyncWrap(async (req, res) => {
  const requestData = req.query;
  const posts = await postService.retrievePosts(requestData);
  res.status(200).json(posts);
});

const retrieveUserPosts = asyncWrap(async (req, res) => {
  const requestData = req.query;
  const posts = await postService.retrieveUserPosts(requestData);
  res.status(200).json(posts);
});

const createAPost = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;
  await postService.createAPost(accountId, requestData);
  res.status(200).send({ message: "Post has been created" });
});

const retrieveAPost = asyncWrap(async (req, res) => {
  const loggedInUserId = res.locals.accountId;
  const postId = req.query.postId;

  const post = loggedInUserId
    ? await postService.retrieveAPost(postId, loggedInUserId)
    : await postService.retrieveAPost(postId);

  res.status(200).send(post);
});

const updateAPost = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;
  // 게시물 수정하기
  const updatedPost = await postService.updateAPost(accountId, requestData);
  // 생성된 게시물을 유저페이지 서버에 보내기
  await updatePostFromUserPage(accountId, updatedPost);
  res.status(200).send({ message: "Post has been edited" });
});

const deleteAPost = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const postId = req.body.postId;
  // 게시물 삭제하기
  await postService.deleteAPost(accountId, postId);
  // 유저 페이지에서도 게시물 삭제하기
  await deletePostFromUserPage(accountId, postId);
  res.status(200).send({ message: "Post has been deleted" });
});

const adminDeleteAPost = asyncWrap(async (req, res) => {
  const { adminAcctId, isAdmin } = res.locals;
  const { accountId, postId } = req.body;

  await postService.deleteAPost(adminAcctId, postId, isAdmin);

  await deletePostFromUserPage(accountId, postId);
  res.status(200).send({ message: "Post has been deleted" });
});

module.exports = {
  retrievePosts,
  retrieveUserPosts,
  createAPost,
  retrieveAPost,
  updateAPost,
  deleteAPost,
  adminDeleteAPost,
};
