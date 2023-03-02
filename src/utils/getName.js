const userDao = require("./../models/user.dao.js");

const getName = async (req, res, next) => {
  const email = res.locals.email;
  const name = await userDao.getNameByEmail(email);
  res.locals.name = name;
  next();
};

module.exports = { getName };
