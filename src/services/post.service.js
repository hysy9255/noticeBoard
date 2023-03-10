const postDao = require("../models/post.dao");

const retrieveTitlesByCategory = async (category) => {
  try {
    const post = await postDao.retrieveTitlesByCategory(
      category,
      orderBy,
      method
    );
    return post;
  } catch (error) {
    throw error;
  }
};

const createAPost = async (category, title, name, email, contents) => {
  try {
    const views = 0;
    const post = await postDao.createAPost(
      category,
      title,
      name,
      email,
      contents,
      views
    );
    return post;
  } catch (error) {
    throw error;
  }
};

const retrieveAPostNoToken = async (postId) => {
  try {
    await postDao.updateViews(postId);
    const post = await postDao.retrieveAPost(postId);
    post.deleteAllowed = false;
    post.modifyAllowed = false;
    for (let i = 0; i < post.comments.length; i++) {
      post.comments[i].modifyAllowed = false;
      post.comments[i].deleteAllowed = false;
    }
    return post;
  } catch (error) {
    throw error;
  }
};

const retrieveAPost = async (postId, userEmail, isAdmin) => {
  try {
    await postDao.updateViews(postId);
    const post = await postDao.retrieveAPost(postId);
    if (userEmail === post.email) {
      post.deleteAllowed = true;
      post.modifyAllowed = true;
    } else if (isAdmin) {
      post.modifyAllowed = false;
      post.deleteAllowed = true;
    } else {
      post.modifyAllowed = false;
      post.deleteAllowed = false;
    }

    for (let i = 0; i < post.comments.length; i++) {
      if (post.comments[i].email === userEmail) {
        post.comments[i].modifyAllowed = true;
        post.comments[i].deleteAllowed = true;
      } else if (isAdmin) {
        post.comments[i].modifyAllowed = false;
        post.comments[i].deleteAllowed = true;
      } else {
        post.comments[i].modifyAllowed = false;
        post.comments[i].deleteAllowed = false;
      }
    }

    return post;
  } catch (error) {
    throw error;
  }
};

const updateAPost = async (email, postId, newTitle, newContents) => {
  try {
    const postExists = await postDao.findAPost(email, postId);
    if (postExists === null) {
      throw new Error("자신이 작성한 게시물만 수정/삭제 가능");
    }
    const updatedPost = await postDao.updateAPost(
      postId,
      newTitle,
      newContents
    );
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

const deleteAPost = async (email, postId) => {
  try {
    const post = await postDao.findAPost(email, postId);
    if (post === null) {
      throw new Error("자신이 작성한 게시물만 수정/삭제 가능");
    }
    const deletedPost = await postDao.deleteAPost(postId);
    return [post, deletedPost];
  } catch (error) {
    throw error;
  }
};

const adminDeleteAPost = async (postId) => {
  try {
    const deleted = await postDao.adminDeleteAPost(postId);
    return deleted;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveTitlesByCategory,
  updateAPost,
  deleteAPost,
  createAPost,
  retrieveAPost,
  retrieveAPostNoToken,
  adminDeleteAPost,
};
