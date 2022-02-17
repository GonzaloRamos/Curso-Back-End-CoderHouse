import {ProductosModel} from "../../models/mongoDB/ProductosSchema.js";
import ApiProductos from "../../models/productos/productos.api.js";

export default class ProductosDao extends ApiProductos {
  constructor() {
    super();
    this.model = ProductosModel;
  }

  async save(producto) {
    try {
      const productoComplete = {timeStamp: Date.now(), ...producto};
      return await ProductosModel.create(productoComplete);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAllOrById(id) {
    try {
      if (id) {
        return await ProductosModel.findById(id);
      }
      return await ProductosModel.find();
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateProducto(id, producto) {
    try {
      const productoUpdate = await ProductosModel.findByIdAndUpdate(
        id,
        producto,
        "after"
      );
      return productoUpdate;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteProducto(id) {
    try {
      const productoDelete = await ProductosModel.findByIdAndDelete(id);
      return productoDelete;
    } catch (error) {
      console.log(error.message);
    }
  }
}
