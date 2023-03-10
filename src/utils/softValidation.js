const jwt = require("jsonwebtoken");

const softValidator = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token === "") {
    res.locals.loggedIn = false;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    res.locals.loggedIn = true;
    res.locals.name = decodedToken.name;
    res.locals.email = decodedToken.email;
    res.locals.isAdmin = decodedToken.isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { softValidator };
