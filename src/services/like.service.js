const likeDao = require("./../models/like.dao.js");
const postDao = require("./../models/post.dao.js");

const likeAPost = async (email, postId) => {
  try {
    const likeExists = await likeDao.findALike(email, postId);
    if (likeExists) {
      await likeDao.unlikeAPost(email, postId);
      const likes = await likeDao.retrieveLikes(email, postId);
      const likesCount = likes.length;
      await postDao.updateLikesCount(postId, likesCount);
      return "Deleted like for the post";
    } else {
      await likeDao.likeAPost(email, postId);
      const likes = await likeDao.retrieveLikes(email, postId);
      const likesCount = likes.length;
      await postDao.updateLikesCount(postId, likesCount);
      return "Created like for the post";
    }
  } catch (error) {
    throw error;
  }
};

const retrieveLikes = async (email, postId) => {
  try {
    const likes = await likeDao.retrieveLikes(email, postId);
    const likesCount = likes.length;
    const likeExists = await likeDao.findALike(email, postId);
    let currentUserLiked;
    if (likeExists) {
      currentUserLiked = true;
    } else {
      currentUserLiked = false;
    }
    return [likesCount, currentUserLiked];
  } catch (error) {
    throw error;
  }
};

module.exports = { likeAPost, retrieveLikes };
