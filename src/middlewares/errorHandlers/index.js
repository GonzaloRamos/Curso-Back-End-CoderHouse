const {errorLogger} = require("../../log/logger/index");
const errorHandler = (err, req, res, next) => {
  console.log(err);
  const {error, message} = JSON.parse(err);

  errorLogger.error(`Error en metodo ${req.method} en la url ${req.url}. ${message}`);
  res.status(error.code).render("./pages/errors/error.ejs", {...error, message});
};

module.exports = errorHandler;
