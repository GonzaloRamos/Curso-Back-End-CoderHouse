import {v4 as uuidv4} from "uuid";
import fs from "fs/promises";

export class Carrito {
  constructor() {
    this.carrito = [];
    this.open();
  }

  open() {
    try {
      const load = async () => {
        const data = await fs.readFile("./data/carrito.json", "utf-8");
        this.carrito = JSON.parse(data);
      };

      load();
    } catch (error) {
      console.log(error.message);
      this.carritos = [];
    }
  }

  createCarrito() {
    const carrito = {
      id: uuidv4(),
      timeStamp: Date.now(),
      productos: [],
    };
    this.carrito.push(carrito);
    this.saveToJson();
    return carrito.id;
  }

  getAllProducts(id) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      return this.carrito[index].productos;
    }
    return [];
  }

  addProducto(id, producto) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      this.carrito[index].productos.push(producto);
      this.saveToJson();
      return true;
    }
    return;
  }

  delete(id) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      const newList = this.carrito.filter((carrito) => carrito.id !== id);
      this.carrito = newList;
      this.saveToJson();
      return true;
    }
    return;
  }

  deleteProducto(id, idProducto) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      const indexProducto = this.carrito[index].productos.findIndex(
        (producto) => producto.id === idProducto
      );
      if (indexProducto >= 0) {
        const newList = this.carrito[index].productos.filter(
          (producto) => producto.id !== idProducto
        );
        this.carrito[index].productos = newList;
        this.saveToJson();
        return true;
      }
      return false;
    }
    return false;
  }

  saveToJson() {
    try {
      fs.writeFile(
        "./data/carrito.json",
        JSON.stringify(this.carrito, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
