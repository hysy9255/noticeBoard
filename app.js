const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const requestIp = require("request-ip");
const routes = require("./src/routes/index.js");
const { globalErrorHandler } = require("./src/middlewares/errorHandler.js");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(requestIp.mw());
  app.use((req, res, next) => {
    const ip = req.clientIp;
    console.log(ip);
    next();
  });

  app.use(routes);
  app.use(globalErrorHandler);
  return app;
};

module.exports = { createApp };

// dd
