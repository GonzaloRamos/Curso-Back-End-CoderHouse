const {DATABASE_TO_USE} = require("../../config/config");
let chatDao;
let productoDao;

if (DATABASE_TO_USE === "mongoDB") {
  const ChatDaoMongoDB = require("./ChatDaoMongoDB");
  const ProductoDaoMongoDB = require("./ProductosDaoMongoDB");
  chatDao = new ChatDaoMongoDB();
  productoDao = new ProductoDaoMongoDB();
}

module.exports = {chatDao, productoDao};
