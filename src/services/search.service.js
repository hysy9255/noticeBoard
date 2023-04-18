const searchDao = require("./../models/search.dao.js");

const search = async (keyword) => {
  const posts = await searchDao.searchPosts(keyword);
  console.log(posts);
  return posts;
};

module.exports = { search };
