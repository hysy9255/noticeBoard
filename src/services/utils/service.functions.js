// ***
const reconstructObject = (inputArray) => {
  newarray = [];
  for (let i = 0; i < inputArray.length; i++) {
    const outerObject = {};
    const comment = {};
    comment.contents = inputArray[i].contents;
    comment.createdAt = inputArray[i].createdAt;
    comment.updatedAt = inputArray[i].updatedAt;
    comment.commentId = inputArray[i].commentId;
    comment.likes = inputArray[i].likes ? inputArray[i].likes : 0;
    comment.usersWhoLiked = inputArray[i].users;
    outerObject.comment = comment;

    const author = {};
    author.accountId = inputArray[i].accountId;
    author.name = inputArray[i].name;
    author.email = inputArray[i].email;
    author.profileImage = inputArray[i].profileImage;
    outerObject.author = author;

    const user = {};
    user.likeStatus = inputArray[i].likeStatus;
    user.modifyAllowed = inputArray[i].modifyAllowed;
    user.deleteAllowed = inputArray[i].deleteAllowed;
    outerObject.user = user;

    newarray.push(outerObject);
  }

  return newarray;
};

const postDao = require("../../models/post.dao");
const { mainCatDao, subCatDao } = require("../../models/category.dao");
const { getMultipleUserInfos } = require("../../utils/superagent");
const { ObjectId } = require("mongodb");
const likeDao = require("../../models/like.dao");

// ***
const cookRetrievedPosts = async (requestData, sort) => {
  // 1) 주어진 subcategory에 해당되는 모든 게시물 가져오기
  let result;
  if (sort === "general") {
    result = await postDao.retrievePosts(requestData);
  }
  if (sort === "userPage") {
    result = await postDao.retrieveUserPosts(requestData);
  }

  const posts = result.paginatedResults;

  if (result.totalCount.length === 0) {
    return { totalCount: 0, data: [] };
  }
  const totalCount = result.totalCount[0].total;

  // 추가 기능)
  const mainCatIds = posts.map((doc) => new ObjectId(doc.mainCatId));
  const subCatIds = posts.map((doc) => new ObjectId(doc.subCatId));
  const mainCatNames = await mainCatDao.getNamesByIds(mainCatIds);
  const subCatNames = await subCatDao.getNamesByIds(subCatIds);
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
      ...mainCatNames.find(
        (doc) => doc.mainCatId.toString() === posts[i].mainCatId
      ),
      ...subCatNames.find(
        (doc) => doc.subCatId.toString() === posts[i].subCatId
      ),
    });
    merged[i].likes = merged[i].likes ? merged[i].likes : 0;
  }
  return { totalCount, data: merged };
};

module.exports = { reconstructObject, cookRetrievedPosts };
