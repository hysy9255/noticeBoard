const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");
const ObjectId = mongoose.Types.ObjectId;
const { generateSort } = require("./utils/dao.functions");

const Post = mongoose.model("post", postSchema);
// ***
const createAPost = async (accountId, requestData) => {
  const { mainCatId, subCatId, title, contents } = requestData;
  try {
    await Post.create({
      accountId,
      mainCatId,
      subCatId,
      title,
      contents,
    });
  } catch (error) {
    throw error;
  }
};
// ***
const retrievePosts = async (requestData) => {
  const { subCatId, orderBy, method } = requestData;
  // const sort = generateSort(orderBy, method);
  const agg = [
    { $match: { subCatId } },
    {
      $addFields: { postId: "$_id" },
    },
    {
      $project: {
        _id: 0,
        accountId: 1,
        postId: 1,
        title: 1,
        createdAt: 1,
        updatedAt: 1,
        views: 1,
      },
    },
    // {
    //   $sort: sort,
    // },
  ];
  try {
    return await Post.aggregate(agg);
  } catch (error) {
    throw error;
  }
};
// ***
const retrieveAPost = async (postId) => {
  try {
    const agg = [
      { $match: { _id: ObjectId(postId) } },
      { $addFields: { postId: "$_id" } },
      {
        $project: {
          _id: 0,
          mainCatId: 0,
          __v: 0,
        },
      },
    ];
    return await Post.aggregate(agg);
  } catch (error) {
    throw error;
  }
};
// ***
const updateViews = async (postId) => {
  try {
    const post = await Post.findById(postId);
    post.views = post.views + 1;
    await post.save();
  } catch (error) {
    throw error;
  }
};
// ***
const updateAPost = async (requestData) => {
  const { postId, newTitle, newContents } = requestData;
  try {
    const post = await Post.findById(postId);
    post.title = newTitle;
    post.contents = newContents;
    await post.save();
  } catch (error) {
    throw error;
  }
};
// ***
const deleteAPost = async (postId) => {
  try {
    await Post.deleteOne({ _id: postId });
  } catch (error) {
    throw error;
  }
};

const retrieveUserPosts = async (requestData) => {
  const { accountId } = requestData;
  const agg = [
    { $match: { accountId } },
    {
      $addFields: { postId: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];
  try {
    return await Post.aggregate(agg);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrievePosts,
  retrieveUserPosts,
  createAPost,
  retrieveAPost,
  updateViews,
  updateAPost,
  deleteAPost,
};
