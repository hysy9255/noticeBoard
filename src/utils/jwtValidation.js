const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../env/.env" });

const jwtValidator = (req, res, next) => {
  const jsonwebtoken = req.headers.authorization;
  if (!jsonwebtoken) {
    const error = new Error("Sign-In required action");
    return next(error);
  }

  const decodedJwt = jwt.verify(jsonwebtoken, process.env.SECRETE_KEY);
  res.locals.email = decodedJwt.email;
  next();
};

module.exports = { jwtValidator };
