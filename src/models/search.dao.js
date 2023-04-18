const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");

const Post = mongoose.model("post", postSchema);
// {
//   compound: {
//     should: [
//       {
//         autocomplete: {
//           query: keyword,
//           path: "title",
//           fuzzy: { maxEdits: 1 },
//         },
//       },
//     ],
//   },
// },

const searchPosts = async (keyword) => {
  try {
    const agg = [
      {
        $search: { path: keyword },
      },
      {
        $limit: 10,
      },
      { $project: { title: 1, accountId: 1, mainCatId: 1, subCatId: 1 } },
    ];
    const result = await Post.aggregate(agg);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { searchPosts };
