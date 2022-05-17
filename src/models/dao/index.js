const {DATABASE_TO_USE, factoryNames} = require("../../config/config");
const Factory = require("../factory/Factory");

let chatDao;
let productosDao;

if (DATABASE_TO_USE === "mongoDB") {
  for (let i = 0; i < factoryNames.length; i++) {
    const factory = Factory.getDaoInstance(factoryNames[i]);
    if (factoryNames[i] === "chat") {
      chatDao = factory;
    } else if (factoryNames[i] === "productos") {
      productosDao = factory;
    }
  }

  module.exports = {chatDao, productosDao};
} else {
  throw new Error("No se ha definido una base de datos");
}
