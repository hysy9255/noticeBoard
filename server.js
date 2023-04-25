const { createApp } = require("./app.js");
require("dotenv").config({ path: "./env/.env" });
const mongoose = require("mongoose");
const cron = require("node-cron");
const { scheduler } = require("./src/utils/scheduler");

const startServer = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DATABASE_URI, () => {
    console.log("Database has been connected");
  });

  const app = createApp();
  const PORT = 3000;

  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));

  // const minutes = 30;
  // cron.schedule(`*/${minutes} * * * *`, async () => {
  //   console.log(`Executing scheduler every ${minutes} minutes`);
  //   await scheduler();
  // });
};

startServer();
