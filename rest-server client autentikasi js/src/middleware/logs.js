const logRequest = (req, res, next) => {
  console.log("terjadi request ke path", req.path);
  next();
};

module.exports = logRequest;
