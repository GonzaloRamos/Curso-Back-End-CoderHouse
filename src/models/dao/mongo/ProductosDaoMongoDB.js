const MongoDBContainer = require("../../containers/mongo/MongoDBContainer");
const {productoSchema} = require("../../schema/index");

class ProductosDaoMongoDB extends MongoDBContainer {
  static #instance;

  constructor() {
    if (!!ProductosDaoMongoDB.#instance) {
      return ProductosDaoMongoDB.#instance;
    }
    super("productos", productoSchema);
    ProductosDaoMongoDB.#instance = this;
  }
}

module.exports = ProductosDaoMongoDB;
