const postDao = require("./../models/post.dao.js");

const validateAuthor = async (req, res, next) => {
  const email = res.locals.email;
  const postId = req.body.postId;

  const postExists = await postDao.findPost(email, postId);
  if (!postExists) {
    const error = new Error("자신이 작성한 게시물만 수정/삭제 가능");
    return next(error);
  }
  next();
};

module.exports = { validateAuthor };
