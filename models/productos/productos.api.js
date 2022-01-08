const productosList = require("../../data/productos");
const { v4: uuidv4 } = require("uuid");
class ApiProductos {
  constructor() {
    this.productos = [];
    this.load();
  }

  load() {
    try {
      const load = async () => {
        this.productos = await productosList;
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.productos = [];
    }
  }

  getAll() {
    return this.productos;
  }
  save(producto) {
    const itemComplete = { id: uuidv4(), ...producto };
    this.productos.push(itemComplete);

    return itemComplete;
  }
  getById(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  updateProducto(id, producto) {
    const index = this.productos.findIndex((producto) => producto.id === id);
    this.productos[index] = { id, ...producto };
  }

  deleteProducto(id) {
    const productExist = this.productos.includes(
      (producto) => producto.id === id
    );

    if (productExist) {
      const newList = this.productos.filter((producto) => producto.id !== id);
      this.productos = newList;
      return true;
    }
    return;
  }
}

module.exports = ApiProductos;
