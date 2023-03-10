const commentDao = require("./../models/comment.dao.js");

const createAComment = async (email, name, postId, contents) => {
  try {
    const comment = await commentDao.createAComment(
      email,
      name,
      postId,
      contents
    );
    return comment;
  } catch (error) {
    throw error;
  }
};

const updateAComment = async (email, postId, commentId, newContents) => {
  try {
    const comment = await commentDao.findAComment(postId, commentId);
    if (comment.email !== email) {
      throw new Error("자신이 작성한 댓글만 수정/삭제 가능");
    }
    const updatedComment = await commentDao.updateAComment(
      postId,
      commentId,
      newContents
    );
    return updatedComment;
  } catch (error) {
    throw error;
  }
};

const deleteAComment = async (email, postId, commentId) => {
  const comment = await commentDao.findAComment(postId, commentId);
  if (comment.email !== email) {
    throw new Error("자신이 작성한 댓글만 수정/삭제 가능");
  }

  const deletedComment = await commentDao.deleteAComment(postId, commentId);
  return deletedComment;
};

module.exports = { createAComment, updateAComment, deleteAComment };
