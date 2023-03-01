const mongoose = require("mongoose");

const { createApp } = require("./app.js");

require("dotenv").config({ path: "./env/.env" });

const startServer = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DATABASE_URI, () => {
    console.log("Data source has been initialized");
  });

  const app = createApp();
  const PORT = 8000;

  app.get("/", (req, res) => {
    res.status(200).send("hello world");
  });

  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

startServer();
