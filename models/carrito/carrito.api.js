import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export class Carrito {
  constructor(id = uuidv4()) {
    this.open();
    this.id = id;
    this.timeStamp = Date.now();
    this.productos = [];
    this.jsonCarrito = [];
  }

  open() {
    try {
      const load = async () => {
        const data = await fs.readFile("./data/carrito.json", "utf-8");
        this.jsonCarrito = JSON.parse(data);

        const index = this.jsonCarrito.findIndex(
          (carrito) => carrito.id === this.id
        );
        if (index === -1) {
          this.jsonCarrito.push({
            id: this.id,
            timeStamp: this.timeStamp,
            productos: this.productos,
          });
          fs.writeFile(
            "data/carrito.json",
            JSON.stringify(this.jsonCarrito, null, 2),
            "utf-8"
          );
        } else {
          const { timeStamp, productos } = this.jsonCarrito[index];
          this.timeStamp = timeStamp;
          this.productos = productos;
        }
      };

      load();
    } catch (error) {
      console.log(error.message);
    }
  }

  delete(id) {
    try {
      this.jsonCarrito.filter((carrito) => carrito.id !== id);
      fs.writeFile(
        "./data/carrito.json",
        JSON.stringify(this.jsonCarrito, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  getAllProductos() {
    return this.productos;
  }

  save(obj) {
    try {
      const index = this.jsonCarrito.findIndex(
        (carrito) => carrito.id === this.id
      );
      this.jsonCarrito[index].productos.push(obj);
      fs.writeFile(
        "./data/carrito.json",
        JSON.stringify(this.jsonCarrito, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
