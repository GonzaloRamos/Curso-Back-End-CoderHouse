const MongoDBContainer = require("../../containers/MongoDBContainer");
const {productoSchema} = require("../../schemas/index");

class ProductosDaoMongoDB extends MongoDBContainer {
  static #instance = null;
  constructor() {
    super("productos", productoSchema);
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new ProductosDaoMongoDB();
    }
    return this.#instance;
  }
}

module.exports = ProductosDaoMongoDB;
