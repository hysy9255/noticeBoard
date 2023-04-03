const jwt = require("jsonwebtoken");
const { detectError } = require("./../utils/error");
require("dotenv").config({ path: "./../../env/.env" });

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      detectError("TOKEN_DOES_NOT_EXIST");
    }

    const decoded = await jwt.verify(token, process.env.SECRETE_KEY);
    if (!decoded) {
      detectError("DECODING_TOKEN_FAILED");
    }

    res.locals.accountId = decoded.accountId;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyUserOptionally = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next();
    }

    const decoded = await jwt.verify(token, process.env.SECRETE_KEY);
    if (!decoded) {
      detectError("DECODING_TOKEN_FAILED");
    }

    res.locals.accountId = decoded.accountId;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      detectError("TOKEN_DOES_NOT_EXIST");
    }

    const decoded = await jwt.verify(token, process.env.SECRETE_KEY);
    if (!decoded) {
      detectError("DECODING_TOKEN_FAILED");
    }

    if (!decoded.isAdmin) {
      detectError("ACCESS_NOT_ALLOWED_FOR_USER_ACCOUNT");
    }

    res.locals.adminAcctId = decoded.accountId;
    res.locals.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyUser, verifyUserOptionally, verifyAdmin };
