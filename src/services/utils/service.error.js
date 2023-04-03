const { detectError } = require("../../utils/error.js");

const checkTheAuthor = (accountId, contents) => {
  if (contents.accountId !== accountId) {
    detectError("Only the author of the content can edit/delete it", 400);
  }
};

module.exports = { checkTheAuthor };
