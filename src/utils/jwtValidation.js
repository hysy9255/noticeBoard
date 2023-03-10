const jwt = require("jsonwebtoken");

const jwtValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error("Access denied. Sign-In required");
    return next(error);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    res.locals.name = decodedToken.name;
    res.locals.email = decodedToken.email;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { jwtValidator };
