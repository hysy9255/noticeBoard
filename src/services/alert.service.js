const alertDao = require("../models/alert.dao");
// ***
const retrieveAlerts = async (accountId) => {
  return await alertDao.retrieveAlert.forComment(accountId);
};
// ***
const changeReadStatus = async (requestData) => {
  await alertDao.changeReadStatus.forComment(requestData);
};

module.exports = { retrieveAlerts, changeReadStatus };
