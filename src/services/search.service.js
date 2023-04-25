const { searchAccounts } = require("../utils/superagent.js");
const searchDao = require("./../models/search.dao.js");

const autoComplete = async (keyword) => {
  return await searchDao.postAutoCompleteSearch(keyword);
};

const search = async (keyword) => {
  const postResult = await searchDao.searchPosts(keyword);
  const accountResult = await searchAccounts(keyword);

  return {
    posts: postResult,
    accounts: accountResult,
  };
};

module.exports = { search, autoComplete };
