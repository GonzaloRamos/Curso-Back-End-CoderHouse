// const {fork} = require("child_process");
const Utils = require("../utils/Utils");

const getRandomController = async (req, res, next) => {
  let cant = 100000000;
  if (req.query.quantity) {
    cant = req.query.quantity;
    res.status(200).json(Utils.randomNumbers(cant));
  }
  // const computo = fork("./utils/randomNumbers.js");
  // computo.send(cant);
  // computo.on("message", (value) => {
  //   res.status(200).json(value);
  // });
};

module.exports = getRandomController;
