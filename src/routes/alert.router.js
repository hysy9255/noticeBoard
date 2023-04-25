const express = require("express");
const alert = express.Router();
const { verifyUser } = require("../middlewares/signInRequired");
const {
  retrieveAlerts,
  changeReadStatus,
} = require("../controllers/alert.controller");

alert.get("", verifyUser, retrieveAlerts); // ***
alert.patch("", verifyUser, changeReadStatus); // ***

module.exports = alert;
