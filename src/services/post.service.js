const postDao = require("../models/post.dao");
const likeDao = require("../models/like.dao");
const error = require("./utils/service.error");
const {
  getUserInfo,
  getMultipleUserInfos,
  getUserNames,
} = require("../utils/superagent");
// ***
const createAPost = async (accountId, requestData) => {
  await postDao.createAPost(accountId, requestData);
};
// ***
const retrievePosts = async (requestData) => {
  // 1) 주어진 subcategory에 해당되는 모든 게시물 가져오기
  const posts = await postDao.retrievePosts(requestData);
  if (posts.length === 0) {
    return [];
  }
  // 2) 게시물 작성자의 정보 가져오기
  const authorIds = posts.map((doc) => doc.accountId);
  const authorInfos = await getMultipleUserInfos(authorIds);
  // 3) 각 게시물의 좋아요 갯수 가져오기
  const postIds = posts.map((doc) => doc.postId.toString());
  const likes = await likeDao.retrieveLikesForPosts(postIds);
  // 1) + 2) + 3)
  const merged = [];
  for (let i = 0; i < posts.length; i++) {
    merged.push({
      ...posts[i],
      ...authorInfos.find((elem) => elem.accountId === posts[i].accountId),
      ...likes.find((doc) => doc.postId === posts[i].postId.toString()),
    });
    merged[i].likes = merged[i].likes ? merged[i].likes : 0;
  }
  return merged;
};
// ***
const retrieveAPost = async (postId, loggedInUserId) => {
  await postDao.updateViews(postId);
  // <--- post 객체 --->
  // 게시물과 그에 해당되는 좋아요 가져오기
  const [post] = await postDao.retrieveAPost(postId);
  const [likes] = await likeDao.retrieveLikesForAPost(postId);
  const userNames = await getUserNames(likes.users);
  post.likes = likes.count;
  post.usersWhoLiked = userNames;

  // // <--- author 객체 --->
  // // auth 서버로부터 게시물 작성자의 정보를 가져오기
  const authorId = post.accountId;
  delete post.accountId;
  const author = await getUserInfo(authorId.toString());
  author.authorId = authorId;

  // // <--- user 객체 --->
  // // 로그인한 현 사용자가 해당 게시물에 좋아요를 눌렀는지 확인
  const user = {};
  const likeExists = await likeDao.findALike(loggedInUserId, postId, "post");
  user.likeStatus = likeExists ? true : false;
  // 로그인한 현 사용자와 게시물의 작성자와 일치하면 게시물 수정 가능
  const allowed = { deleteAllowed: true, modfifyAllowed: true };
  const disallowed = { deleteAllowed: false, modfifyAllowed: false };
  !loggedInUserId
    ? Object.assign(user, disallowed)
    : loggedInUserId !== authorId
    ? Object.assign(user, disallowed)
    : Object.assign(user, allowed);

  return { post, author, user };
};
// ***
const updateAPost = async (accountId, requestData) => {
  const { postId } = requestData;
  const [post] = await postDao.retrieveAPost(postId);
  error.checkTheAuthor(accountId, post);
  await postDao.updateAPost(requestData);
};
// ***
const deleteAPost = async (isAdmin, postId, accountId) => {
  const [post] = await postDao.retrieveAPost(postId);
  if (!isAdmin) error.checkTheAuthor(accountId, post);
  await postDao.deleteAPost(postId);
};

const retrieveUserPosts = async (requestData) => {
  return await postDao.retrieveUserPosts(requestData);
};

module.exports = {
  retrievePosts,
  retrieveUserPosts,
  updateAPost,
  deleteAPost,
  createAPost,
  retrieveAPost,
};
