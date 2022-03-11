const MongoDBContainer = require("../containers/MongoDBContainer");
const {productoSchema} = require("../schemas/index");

class ProductosDaoMongoDB extends MongoDBContainer {
  constructor() {
    super("productos", productoSchema);
  }
}

module.exports = ProductosDaoMongoDB;
