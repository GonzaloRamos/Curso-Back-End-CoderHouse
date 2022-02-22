import FireBaseContainter from "../../containers/FireBaseContainer.js";

//Manage mongoDB database

class ProductosDaoFireBase extends FireBaseContainter {
  constructor() {
    super("productos");
  }

  async getAll(idProducto) {
    try {
      if (idProducto) {
        const producto = await super.getAllDataOrById(idProducto);
        return {
          singleProduct: true,
          state: {
            message: "Producto encontrado exitosamente",
            idProducto,
            producto,
            serverStatus: 200,
          },
        };
      }
      const productos = await super.getAllDataOrById();
      return {
        singleProduct: false,
        state: {
          message: "Se encontraron todos los productos de la coleccion",

          productos,
          serverStatus: 200,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  //{nombre, descripcion, codigo, fotoUrl, precio, stock}
  async addProduct(data) {
    const objectKeys = Object.keys(data);
    if (typeof data === "object" && objectKeys.length === 6) {
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

export default ProductosDaoFireBase;
