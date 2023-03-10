const likeService = require("./../services/like.service.js");

const likeAPost = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const postId = req.body.postId;
    const message = await likeService.likeAPost(email, postId);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
};

const retrieveLikes = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const postId = req.body.postId;

    const [likesCount, currentUserLiked] = await likeService.retrieveLikes(
      email,
      postId
    );
    res.status(200).send({
      message: "Likes have been retrieved",
      likesCount,
      currentUserLiked,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { likeAPost, retrieveLikes };
