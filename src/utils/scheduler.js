const { deleteReadData } = require("../models/alert.dao");

const scheduler = async () => {
  await deleteReadData.forComment();
};

module.exports = { scheduler };
