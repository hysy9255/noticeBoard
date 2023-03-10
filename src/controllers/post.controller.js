const postService = require("../services/post.service.js");
const superagent = require("superagent");

const retrieveTitlesByCategory = async (req, res, next) => {
  try {
    const category = req.query.category;
    const orderBy = req.query.orderBy;
    const method = req.query.method;

    const posts = await postService.retrieveTitlesByCategory(
      category,
      orderBy,
      method
    );
    res
      .status(200)
      .json({ message: "All posts has been retrieved", data: posts });
  } catch (error) {
    next(error);
  }
};

const createAPost = async (req, res, next) => {
  try {
    const post = await postService.createAPost(
      req.query.category,
      req.body.title,
      res.locals.name,
      res.locals.email,
      req.body.contents
    );

    const response = await superagent
      .patch("http://localhost:5000/myPage/createAPost")
      .send({ postInfo: post });

    if (response.body.message === "Successfully posted") {
      res.status(200).send({
        message: "Post has been created",
        data: post,
      });
    }
  } catch (error) {
    next(error);
  }
};

const retrieveAPost = async (req, res, next) => {
  try {
    let post;
    if (res.locals.loggedIn === true) {
      post = await postService.retrieveAPost(
        req.body.postId,
        res.locals.email,
        res.locals.isAdmin
      );
    } else {
      post = await postService.retrieveAPostNoToken(req.body.postId);
    }

    res.status(200).send({ message: "Post has been retrieved", data: post });
  } catch (error) {
    next(error);
  }
};

const updateAPost = async (req, res, next) => {
  try {
    const updatedPost = await postService.updateAPost(
      res.locals.email,
      req.body.postId,
      req.body.newTitle,
      req.body.newContents
    );

    const response = await superagent
      .patch("http://localhost:5000/myPage/updateAPost")
      .send({ postInfo: updatedPost });

    console.log(response);

    if (response.body.message === "Successfully updated") {
      res
        .status(200)
        .send({ message: "Post has been updated", data: updatedPost });
    }
  } catch (error) {
    next(error);
  }
};

const deleteAPost = async (req, res, next) => {
  try {
    const [post, deletedPost] = await postService.deleteAPost(
      res.locals.email,
      req.body.postId
    );

    const response = await superagent
      .patch("http://localhost:5000/myPage/deleteAPost")
      .send({ postInfo: post });

    if (response.body.message === "Successfully deleted") {
      res.status(200).send({
        message: "Post has been deleted",
        deletedPost: post,
        data: deletedPost,
      });
    }
  } catch (error) {
    next(error);
  }
};

const adminDeleteAPost = async (req, res, next) => {
  try {
    const deleted = await postService.adminDeleteAPost(req.body.postId);
    res.status(200).send({ message: "Admin deleted post", data: deleted });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  retrieveTitlesByCategory,
  createAPost,
  retrieveAPost,
  updateAPost,
  deleteAPost,
  adminDeleteAPost,
};
