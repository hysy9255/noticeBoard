const postDao = require("./../models/post.dao.js");

const validateAuthorForComment = async (req, res, next) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  const comment = await postDao.findCommentFromPost(postId, commentId);
  const author = res.locals.name;
  if (author !== comment.author) {
    const error = new Error("자신이 작성한 댓글만 수정/삭제 가능");
    return next(error);
  }
  next();
};

module.exports = { validateAuthorForComment };
