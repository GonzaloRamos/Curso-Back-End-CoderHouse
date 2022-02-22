import FilesContainer from "../../containers/FilesContainer";

export default class CarritoDaoFiles extends FilesContainer {
  constructor() {
    super([], "carrito", "carrito");
  }

  async createCarrito() {
    const carrito = {
      id: uuidv4(),
      timeStamp: Date.now(),
      productos: [],
    };
    this.data.push(carrito);
    await this.saveToJson();
    return carrito.id;
  }

  async deleteProducto(idCarrito, idProducto) {
    const {carrito, producto} = this.dataIndexes(idCarrito, idProducto);
    const {indexCarrito} = carrito;

    switch ((carrito, producto)) {
      case carrito.state && producto.state:
        const newList = this.data[indexCarrito].productos.filter(
          (producto) => producto.id !== idProducto
        );
        this.data[indexCarrito].productos = newList;
        await this.saveToJson();
        return true;
      case carrito.state && !producto.state:
        return false;

      default:
        return false;
    }
  }

  dataIndexes(idCarrito, idProducto) {
    const indexCarrito = this.data.findIndex((data) => data.id === idCarrito);
    if (indexCarrito >= 0) {
      const indexProducto = this.data[index].productos.findIndex(
        (producto) => producto.id === idProducto
      );
      if (indexProducto >= 0) {
        return {
          carrito: {state: true, indexCarrito},
          producto: {state: true, indexProducto},
        };
      }
      return {
        carrito: {state: true, indexCarrito},
        producto: {state: false, indexProducto},
      };
    }
    return {
      carrito: {state: false, indexCarrito},
      producto: {state: false, indexProducto},
    };
  }
}
