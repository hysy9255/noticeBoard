const asyncWrap = (func) => {
  return (req, res, next) => {
    func(req, res).catch((error) => next(error));
  };
};

const detectError = (message, status) => {
  const error = new Error(message);
  error.statusCode = status;
  throw error;
};

module.exports = { asyncWrap, detectError };
