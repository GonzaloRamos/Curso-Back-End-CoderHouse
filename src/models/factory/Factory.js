const ChatDaoMongoDB = require("../dao/mongo/ChatDaoMongoDB");
const ProductosDaoMongoDB = require("../dao/mongo/ProductosDaoMongoDB");

//SingleTone pattern
class Factory {
  static objectDaos = {
    chat: ChatDaoMongoDB,
    productos: ProductosDaoMongoDB,
  };

  constructor() {
    throw new Error("This class is a singleton");
  }

  static getDaoInstance(name) {
    return this.objectDaos[name].getInstance();
  }
}

module.exports = Factory;
