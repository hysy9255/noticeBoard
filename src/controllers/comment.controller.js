const commentService = require("../services/comment.service.js");

const createAComment = async (req, res, next) => {
  try {
    const comment = await commentService.createAComment(
      res.locals.email,
      res.locals.name,
      req.body.postId,
      req.body.contents
    );
    res
      .status(200)
      .send({ message: "Comment has been created", data: comment });
  } catch (error) {
    next(error);
  }
};

const updateAComment = async (req, res, next) => {
  try {
    const updatedComment = await commentService.updateAComment(
      res.locals.email,
      req.body.postId,
      req.body.commentId,
      req.body.newContents
    );
    res.status(200).send({
      message: "Comment has been updated",
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAComment = async (req, res, next) => {
  try {
    const deletedComment = await commentService.deleteAComment(
      res.locals.email,
      req.body.postId,
      req.body.commentId
    );
    res
      .status(200)
      .send({ message: "comment has been deleted", data: deletedComment });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAComment, updateAComment, deleteAComment };
