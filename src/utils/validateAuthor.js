const postDao = require("./../models/post.dao.js");

const validateAuthor = async (req, res, next) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  // commentId가 없으면 post를 위한 validation
  if (commentId === undefined) {
    const email = res.locals.email;
    const postExists = await postDao.findPost(email, postId);
    if (!postExists) {
      const error = new Error("자신이 작성한 게시물만 수정/삭제 가능");
      return next(error);
    }
    next();
  }
  // commentId가 있으면 comment를 위한 validation
  else {
    const comment = await postDao.findCommentFromPost(postId, commentId);
    const author = res.locals.name;
    if (author !== comment.author) {
      const error = new Error("자신이 작성한 댓글만 수정/삭제 가능");
      return next(error);
    }
    next();
  }
};

module.exports = { validateAuthor };
