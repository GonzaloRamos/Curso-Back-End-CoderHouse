const MongoDBContainer = require("../containers/MongoDBContainer");
const {productoSchema} = require("../schemas/index");

let instance = null;
class ProductosDaoMongoDB extends MongoDBContainer {
  constructor() {
    if (!instance) {
      super("productos", productoSchema);
      instance = this;
    } else {
      return instance;
    }
  }
}

module.exports = ProductosDaoMongoDB;
