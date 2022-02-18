import Mongoose from "mongoose";
import configDataBase from "../../config/configDataBase.js";

await Mongoose.connect(configDataBase.mongoDB.uri);

class MongoDBContainer {
  constructor(collection, schema) {
    this.model = Mongoose.model(collection, schema);
  }

  async save(producto) {
    try {
      const productoComplete = {timeStamp: Date.now(), ...producto};
      return await this.model.create(productoComplete);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAllOrById(id) {
    try {
      if (id) {
        return await this.model.findById(id);
      }
      return await this.model.find();
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateProducto(id, producto) {
    try {
      const productoUpdate = await this.model.findByIdAndUpdate(id, producto, "after");
      return productoUpdate;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteProducto(id) {
    try {
      const productoDelete = await this.model.findByIdAndDelete(id);
      return productoDelete;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default MongoDBContainer;
