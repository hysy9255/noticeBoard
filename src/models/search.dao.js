const mongoose = require("mongoose");
const { postSchema } = require("../schemas/post.schema");

const Post = mongoose.model("post", postSchema);

const searchPosts = async (keyword) => {
  try {
    const agg = [
      {
        $search: {
          compound: {
            should: [
              {
                autocomplete: {
                  query: keyword,
                  path: "title",
                  fuzzy: { maxEdits: 1 },
                },
              },
              {
                autocomplete: {
                  query: keyword,
                  path: "mainCategory",
                  fuzzy: { maxEdits: 1 },
                },
              },
              {
                autocomplete: {
                  query: keyword,
                  path: "subCategory",
                  fuzzy: { maxEdits: 1 },
                },
              },
            ],
          },
        },
      },
      {
        $limit: 10,
      },
      { $project: { title: 1, accountId: 1, mainCategory: 1, subCategory: 1 } },
    ];
    const result = await Post.aggregate(agg);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { searchPosts };
