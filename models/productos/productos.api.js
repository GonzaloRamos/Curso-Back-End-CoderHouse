import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export default class ApiProductos {
  constructor() {
    this.productos = [];
    this.load();
  }

  load() {
    try {
      const load = async () => {
        const data = await fs.readFile("./data/productos.json", "utf-8");
        this.productos = JSON.parse(data);
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.productos = [];
    }
  }

  getAllOrById(id) {
    if (id) {
      return this.productos.find((producto) => producto.id === id);
    }
    return this.productos;
  }
  save(producto) {
    const itemComplete = { id: uuidv4(), ...producto };
    this.productos.push(itemComplete);
    this.saveToJson();

    return itemComplete;
  }

  updateProducto(id, producto) {
    const index = this.productos.findIndex((producto) => producto.id === id);
    this.productos[index] = { id, ...producto };

    this.saveToJson();
  }

  deleteProducto(id) {
    const productExist = this.productos.includes(
      (producto) => producto.id === id
    );

    if (productExist) {
      const newList = this.productos.filter((producto) => producto.id !== id);
      this.productos = newList;
      this.saveToJson();
      return true;
    }
    return;
  }

  saveToJson() {
    const save = async () => {
      await fs.writeFile(
        "./data/productos.json",
        JSON.stringify(this.productos),
        null,
        2
      );
    };
    save();
  }
}

module.exports = ApiProductos;
