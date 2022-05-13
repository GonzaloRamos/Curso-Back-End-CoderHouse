const ChatDaoMongoDB = require("../models/dao/ChatDaoMongoDB");
const ProductosDaoMongoDB = require("../models/dao/ProductosDaoMongoDB");
let instance = null;
//SingleTone pattern
class Factory {
  static objectDaos = {
    chat: ChatDaoMongoDB,
    productos: ProductosDaoMongoDB,
  };

  constructor() {
    if (!instance) {
      instance = this;
    } else {
      return instance;
    }
  }

  getDao(name) {
    return new this.objectDaos[name]();
  }
}

module.exports = Factory;
