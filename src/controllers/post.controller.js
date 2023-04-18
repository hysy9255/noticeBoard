const postService = require("./../services/post.service.js");
const { asyncWrap } = require("./../utils/error.js");
// ***
const createAPost = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;
  await postService.createAPost(accountId, requestData);
  res.status(200).send({ message: "Post has been created" });
});
// ***
const retrievePosts = asyncWrap(async (req, res) => {
  const requestData = req.query;
  const posts = await postService.retrievePosts(requestData);
  res.status(200).json(posts);
});
// ***
const retrieveAPost = asyncWrap(async (req, res) => {
  const loggedInUserId = res.locals.accountId;
  const postId = req.query.postId;
  const post = loggedInUserId
    ? await postService.retrieveAPost(postId, loggedInUserId)
    : await postService.retrieveAPost(postId);
  res.status(200).send(post);
});
// ***
const updateAPost = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const requestData = req.body;
  await postService.updateAPost(accountId, requestData);
  res.status(200).send({ message: "Post has been edited" });
});
// ***
const deleteAPost = asyncWrap(async (req, res) => {
  const { accountId, isAdmin } = res.locals;
  const { postId } = req.body;
  await postService.deleteAPost(isAdmin, postId, accountId);
  res.status(200).send({ message: "Post has been deleted" });
});
// ***
const adminDeleteAPost = asyncWrap(async (req, res) => {
  const { isAdmin } = res.locals;
  const { postId } = req.body;
  await postService.deleteAPost(isAdmin, postId);
  res.status(200).send({ message: "Post has been deleted" });
});

const retrieveUserPosts = asyncWrap(async (req, res) => {
  const requestData = req.query;
  const posts = await postService.retrieveUserPosts(requestData);
  res.status(200).json(posts);
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
