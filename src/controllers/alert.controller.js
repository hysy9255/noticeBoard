const { asyncWrap } = require("../utils/error.js");
const alertService = require("../services/alert.service");
// ***
const retrieveAlerts = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const alerts = await alertService.retrieveAlerts(accountId);
  res.status(200).json(alerts);
});
// ***
const changeReadStatus = asyncWrap(async (req, res) => {
  const requestData = req.body;
  await alertService.changeReadStatus(requestData);
  res.status(200).json({ message: "Successfully changed the read status" });
});

module.exports = { retrieveAlerts, changeReadStatus };
