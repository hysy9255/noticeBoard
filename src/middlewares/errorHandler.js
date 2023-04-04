const globalErrorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 400).json({ message: error.message });
};

module.exports = { globalErrorHandler };
