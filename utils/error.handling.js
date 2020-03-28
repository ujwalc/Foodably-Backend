exports.handleError = err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
};
