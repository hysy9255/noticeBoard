const mongoose = require("mongoose");
const { likeSchema, commentLikeSchema } = require("../schemas/like.schema");
const Like = mongoose.model("like", likeSchema);
const commentLike = mongoose.model("commentLike", commentLikeSchema);
// ***
const retrieveLikesForPosts = async (postIds) => {
  const agg = [
    { $match: { postId: { $in: postIds } } },
    { $group: { _id: "$postId", likes: { $count: {} } } },
    { $addFields: { postId: "$_id" } },
    { $project: { _id: 0 } },
  ];
  try {
    return await Like.aggregate(agg);
  } catch (error) {
    throw error;
  }
};
// ***
const retrieveLikesForAPost = async (postId) => {
  const agg = [
    { $match: { postId } },
    {
      $group: {
        _id: "$postId",
        count: { $count: {} },
        users: { $push: "$accountId" },
      },
    },
    { $addFields: { postId: "$_id" } },
    { $project: { _id: 0 } },
  ];
  try {
    return await Like.aggregate(agg);
  } catch (error) {
    throw error;
  }
};
// ***
const retrieveLikesForComments = async (commentIds) => {
  const agg = [
    { $match: { commentId: { $in: commentIds } } },
    {
      $group: {
        _id: "$commentId",
        users: { $push: "$accountId" },
        likes: { $count: {} },
      },
    },
    { $addFields: { commentId: "$_id" } },
    { $project: { _id: 0 } },
  ];
  try {
    return await commentLike.aggregate(agg);
  } catch (error) {
    throw error;
  }
};
// ***
const findALikeForComments = async (accountId, commentIds) => {
  const agg = [
    {
      $match: {
        $and: [{ commentId: { $in: commentIds } }, { accountId }],
      },
    },
    { $project: { _id: 0, commentId: 1 } },
  ];
  try {
    return await commentLike.aggregate(agg);
  } catch (error) {
    throw error;
  }
};
// ***
const findALike = async (accountId, id, identifier) => {
  try {
    if (identifier === "post") {
      return await Like.findOne({ accountId, postId: id });
    }
    if (identifier === "comment") {
      return await commentLike.findOne({ accountId, commentId: id });
    }
  } catch (error) {
    throw error;
  }
};
// ***
const createALike = async (accountId, id, identifier) => {
  try {
    if (identifier === "post") {
      await Like.create({ accountId, postId: id });
    }
    if (identifier === "comment") {
      await commentLike.create({ accountId, commentId: id });
    }
  } catch (error) {
    throw error;
  }
};
// ***
const deleteALike = async (accountId, id, identifier) => {
  try {
    if (identifier === "post") {
      await Like.deleteOne({ accountId, id });
    }
    if (identifier === "comment") {
      await commentLike.deleteOne({ accountId, id });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveLikesForPosts,
  retrieveLikesForAPost,
  retrieveLikesForComments,
  findALikeForComments,
  findALike,
  createALike,
  deleteALike,
};
