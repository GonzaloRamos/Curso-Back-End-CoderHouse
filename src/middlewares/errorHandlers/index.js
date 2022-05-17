const {errorLogger} = require("../../log/logger/index");
const errorHandler = (err, req, res, next) => {
  const {error, message} = JSON.parse(err.message);
  errorLogger.error(`Error en metodo ${req.method} en la url ${req.url}. ${message}`);
  res.render("./pages/errors/error.ejs", {...error, message}).status(code);
};

module.exports = errorHandler;
