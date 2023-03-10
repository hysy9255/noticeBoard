const { createApp } = require("./app.js");
require("dotenv").config({ path: "./env/.env" });
const mongoose = require("mongoose");

const startServer = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DATABASE_URI, () => {
    console.log("Database has been connected");
  });

  const app = createApp();
  const PORT = 3000;

  app.get("/", (req, res) => {
    res.status(200).send("hello world");
  });

  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

startServer();
