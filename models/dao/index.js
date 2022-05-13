const {DATABASE_TO_USE, factoryName} = require("../../config/config");
const Factory = require("../../factory/Factory");
let chatDao;
let productoDao;

if (DATABASE_TO_USE === "mongoDB") {
  chatDao = Factory.getDao(factoryName);
  productoDao = Factory.getDao(factoryName);
}

module.exports = {chatDao, productoDao};
