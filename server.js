const { createApp } = require("./app.js");
require("dotenv").config({ path: "./env/.env" });

const startServer = () => {
  const app = createApp();
  const PORT = 8000;

  app.get("/", (req, res) => {
    res.status(200).send("hello world");
  });

  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

startServer();
