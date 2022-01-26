import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export class Carrito {
  constructor() {
    this.id = uuidv4();
    this.timeStamp = Date.now();
    this.productos = [];
    this.file = {
      id: this.id,
      timeStamp: this.timeStamp,
      productos: this.productos,
    };
    this.jsonCarrito =
      JSON.parse(fs.readFileSync("./data/carrito.json", "utf-8")) || [];
    this.open();
  }
  open() {
    try {
      if (this.jsonCarrito.includes()) {
      }
      this.jsonCarrito.push(this.file);
      fs.writeFileSync(
        "./data/carrito.json",
        JSON.stringify(this.jsonCarrito),
        "utf-8"
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  delete(id) {
    try {
      const index = this.jsonCarrito.findIndex((carrito) => carrito.id === id);
      this.jsonCarrito.splice(index, 1);
      fs.writeFileSync(
        "./data/carrito.json",
        JSON.stringify(this.jsonCarrito),
        "utf-8"
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
