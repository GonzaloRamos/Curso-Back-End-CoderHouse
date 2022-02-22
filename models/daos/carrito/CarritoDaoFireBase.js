import FireBaseContainter from "../../containers/FireBaseContainer.js";

//Manage mongoDB database

export default class CarritoDaoFireBase extends FireBaseContainter {
  constructor() {
    super("carritos");
  }

  async createCarrito(carrito = {productos: []}) {
    try {
      const carritoData = await super.createData(carrito);

      return {
        result: true,
        state: {message: `Se creo el carrito con exito`, carritoData, serverStatus: 200},
      };
    } catch (error) {
      throw new Error(`No se pudo crear el carrito: ${error}`);
    }
  }

  async addProduct(idCarrito, idProducto, producto) {
    try {
      const carrito = await super.getAllDataOrById(idCarrito);

      switch ((carrito, producto)) {
        case carrito && producto:
          carrito.productos.push(producto);
          await super.updateData(idCarrito, carrito);
          return {
            carrito: true,
            producto: true,
            state: {
              message: "Producto agregado exitosamente al carrito",
              idCarrito,
              producto,
              serverStatus: 201,
            },
          };
        case carrito && !producto:
          return {
            carrito: true,
            producto: false,
            state: {
              message: "No se encontro el producto",
              idCarrito,
              idProducto,
              serverStatus: 201,
            },
          };
        default:
          return {
            carrito: false,
            producto: false,
            state: {
              message: "No se encontro el carrito y el producto",
              idCarrito,
              idProducto,
              serverStatus: 204,
            },
          };
      }
    } catch (error) {
      throw new Error(`No se pudo agregar el producto: ${error}`);
    }
  }

  async deleteAllCarrito(idCarrito) {
    try {
      const carrito = await super.getAllDataOrById(idCarrito);
      switch ((idCarrito, carrito)) {
        case idCarrito && carrito:
          await super.deleteData(idCarrito);
          return {
            carrito: true,
            state: {
              message: `Se elimino el carrito correctamente`,
              idCarrito,
              serverStatus: 200,
            },
          };
        case idCarrito && !carrito:
          return {
            carrito: false,
            state: {message: `No se encontro el carrito`, idCarrito, serverStatus: 404},
          };
        default:
          return {
            carrito: false,
            state: {message: `No se proporciono ningun id`, idCarrito, serverStatus: 400},
          };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllProducts(idCarrito) {
    try {
      if (idCarrito) {
        const {productos = []} = await super.getAllDataOrById(idCarrito);

        return {
          productos: true,
          state: {
            message:
              productos.length > 0
                ? "Se obtuvieron todos los productos del carrito"
                : "No hay productos dentro del carrito",
            idCarrito,
            productos,
            serverStatus: 200,
          },
        };
      }

      return {
        productos: false,
        state: {
          message: "Se debe proporcionar un id de carrito",
          idCarrito: null,
          serverStatus: 400,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductCarrito(idCarrito, idProducto) {
    try {
      const carrito = await super.getAllDataOrById(idCarrito);

      const index = carrito.productos.findIndex((data) => data.id === idProducto);
      console.log(index);

      if (index >= 0) {
        const newList = carrito.productos.splice(index, 1);
        const dataUpdated = await super.updateData(idCarrito, {
          ...carrito,
          productos: newList,
        });
        return {
          carrito: true,
          producto: true,
          state: {
            message: "Producto eliminado exitosamente del carrito",
            idCarrito,
            productoEliminado: carrito.productos[index],
            dataUpdated,
            serverStatus: 201,
          },
        };
      }
      return {
        carrito: true,
        producto: false,
        state: {
          message: "No se encontro el producto",
          idCarrito,
          idProducto,
          serverStatus: 200,
        },
      };
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }
}
