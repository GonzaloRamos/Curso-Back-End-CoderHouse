let chatDao;
let productoDao;

if (process.env.DATABASE_TO_USE === "mongoDB") {
  const ChatDaoMongoDB = require("./ChatDaoMongoDB");
  const ProductoDaoMongoDB = require("./ProductosDaoMongoDB");
  chatDao = new ChatDaoMongoDB();
  productoDao = new ProductoDaoMongoDB();
}

module.exports = {chatDao, productoDao};
