const searchService = require("./../services/search.service.js");
const { asyncWrap } = require("./../utils/error.js");

const search = asyncWrap(async (req, res) => {
  const keyword = req.query.keyword;
  const result = await searchService.search(keyword);

  res.status(200).send(result);
});

module.exports = { search };
