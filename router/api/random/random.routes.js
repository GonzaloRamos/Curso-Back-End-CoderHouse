const randomRoute = require("express").Router();
const generateRandomNumbers = require("../../../utils/randomNumbers");
const {fork} = require("child_process");

randomRoute.get("/:quantity?", (req, res) => {
  const quantity = req.query.quantity || 10e4;
  console.log(quantity);
  const computoNumbers = fork("./utils/randomNumbers.js");
  computoNumbers.send(quantity);
  computoNumbers.on("message", (dato) => {
    res.json(dato);
  });
});

module.exports = randomRoute;
