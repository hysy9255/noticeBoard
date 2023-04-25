const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");

const Post = mongoose.model("post", postSchema);

// const agg = [
//   {
//     $search: { path: keyword },
//   },
//   {
//     $limit: 10,
//   },
//   { $project: { title: 1, accountId: 1, mainCatId: 1, subCatId: 1 } },
// ];
// db.collection.find({ $text: { $search: "cat" } })

// const searchPosts = async (keyword) => {
//   try {
//     const result = await Post.find({ $text: { $search: keyword } });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// const agg = [
//   {
//     $search: {
//       index: "postAutoCompleteSearch",
//       autocomplete: {
//         query: keyword,
//         path: "title",
//         tokenOrder: "sequential",
//       },
//     },
//   },
// ];

const postAutoCompleteSearch = async (keyword) => {
  const agg = [
    {
      $search: {
        index: "postAutoCompleteSearch",
        autocomplete: {
          query: keyword,
          path: "title",
          tokenOrder: "sequential",
        },
      },
    },
    { $addFields: { postId: "$_id" } },
    { $project: { _id: 0, postId: 1, title: 1 } },
    { $limit: 10 },
  ];
  try {
    return await Post.aggregate(agg);
  } catch (error) {
    throw error;
  }
};

const searchPosts = async (keyword) => {
  const agg = [
    {
      $search: {
        index: "searchPosts",
        text: {
          query: keyword,
          path: {
            wildcard: "*",
          },
          fuzzy: {},
        },
      },
    },
    { $addFields: { postId: "$_id" } },
    {
      $project: {
        _id: 0,
        mainCatId: 1,
        subCatId: 1,
        accountId: 1,
        postId: 1,
        title: 1,
        createdAt: 1,
        updatedAt: 1,
        views: 1,
      },
    },
  ];
  try {
    return await Post.aggregate(agg);
  } catch (error) {
    throw error;
  }
};

module.exports = { searchPosts, postAutoCompleteSearch };
