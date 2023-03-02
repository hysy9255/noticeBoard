const jwt = require("jsonwebtoken");
const userDao = require("./../models/user.dao.js");
require("dotenv").config({ path: "../../env/.env" });

const jwtValidator = async (req, res, next) => {
  const jsonwebtoken = req.headers.authorization;
  if (!jsonwebtoken) {
    const error = new Error("Access denied. Sign-In required");
    return next(error);
  }

  try {
    const decodedJwt = jwt.verify(jsonwebtoken, process.env.SECRETE_KEY);
    const email = decodedJwt.email;

    const name = await userDao.getNameByEmail(email);
    res.locals.name = name;
    res.locals.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { jwtValidator };
