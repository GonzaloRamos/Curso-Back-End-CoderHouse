import Mongoose from "mongoose";
import MongoDBContainer from "../../containers/MongoDBContainer.js";

const Schema = Mongoose.Schema;
const collection = "productos";
const ProductosSchema = new Schema({
  id: Mongoose.ObjectId,
  timeStamp: {type: Number, required: true, unique: true},
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true},
  codigo: {type: Number, required: true},
  fotoUrl: {type: String, required: true},
  precio: {type: Number, required: true},
  stock: {type: Number, required: true},
});

export default class ProductosDaoMongoDB extends MongoDBContainer {
  constructor() {
    super(collection, ProductosSchema);
  }

  async getAll(idProducto) {
    try {
      if (idProducto) {
        const producto = await super.getAllDataOrById(idProducto);
        return {singleProduct: true, state: {producto, serverStatus: 200}};
      }
      const productos = await super.getAllDataOrById();
      return {singleProduct: false, state: {productos, serverStatus: 200}};
    } catch (error) {
      throw new Error(error);
    }
  }
  //{nombre, descripcion, codigo, fotoUrl, precio, stock}
  async addProduct(data) {
    if (typeof data === "object") {
      const producto = await super.createData(data);
      return {state: {message: "Producto creado con exito", producto, serverStatus: 200}};
    }

    return {state: {message: "Faltan datos", serverStatus: 400}};
  }

  async updateProduct(idProducto, data) {
    const isEmpty = Object.keys(data).length === 0;
    console.log(idProducto, isEmpty);
    if (idProducto) {
      switch (isEmpty) {
        case isEmpty:
          const producto = await super.updateData(idProducto, data);
          return {
            producto: true,
            state: {
              message: `Se actualizo el producto correctamente`,
              producto,
              serverStatus: 200,
            },
          };

        default:
          return {
            producto: true,
            state: {
              message: `No se proporciono ningun dato para actualizar`,
              serverStatus: 400,
            },
          };
      }
    }
    return {
      producto: false,
      state: {
        message: `No se encontro ningun producto para actualizar, no se proporciono un ID`,
        serverStatus: 400,
      },
    };
  }

  async deleteProduct(idProducto) {
    if (idProducto) {
      const producto = await super.getAllDataOrById(idProducto);
      await super.deleteData(idProducto);
      return {
        state: {message: "Producto eliminado correctamente", producto, serverStatus: 200},
      };
    }
    return {state: {message: "No se proporciono ningun id", serverStatus: 400}};
  }
}
