const mongoose = require("mongoose");
// require("dotenv").config({ path: "../../env/.env" });
require("dotenv").config({ path: "./env/.env" });

const conn1 = mongoose.createConnection(process.env.DATABASE_URI, () => {
  console.log("Data source for notice board DB has been initialized");
});

const conn2 = mongoose.createConnection(process.env.DATABASE_URI_USERS, () => {
  console.log("Data source for user DB has been initialized");
});

module.exports = { conn1, conn2 };
