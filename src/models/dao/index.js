const {DATABASE_TO_USE, factoryNames} = require("../../config/config");
const Factory = require("../factory/Factory");

let chatDao;
let productosDao;
if (DATABASE_TO_USE === "mongo") {
  chatDao = Factory.generationInstance("chatDaoMongoDB", "mongo");
  productosDao = Factory.generationInstance("productosDaoMongoDB", "mongo");
  module.exports = {chatDao, productosDao};
} else {
  throw new Error("No se ha definido una base de datos");
}
