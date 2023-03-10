const jwt = require("jsonwebtoken");

const adminValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error("Access denied. Sign-In required");
    return next(error);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    if (decodedToken.isAdmin === true) {
      res.locals.isAdmin = decodedToken.isAdmin;
      return next();
    } else {
      const error = new Error("Regular user can't perform this action");
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { adminValidator };
