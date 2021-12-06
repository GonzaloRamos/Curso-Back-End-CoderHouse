const fs = require("fs/promises");
const express = require("express");
const { connect } = require("http2");

class Contenedor {
  constructor(pathFile) {
    this.pathFile = pathFile;
    this.productos = [];
    this.open();
  }

  open() {
    try {
      const load = async () => {
        const productos = await fs.readFile(this.pathFile, "utf-8");

        this.productos = JSON.parse(productos);
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.productos = [];
    }
  }

  async save(producto) {
    const nuevoProducto = {
      ...producto,
      id: Math.random().toString(36).substr(2, 9),
    };
    this.productos.push(nuevoProducto);
    await fs.writeFile(this.pathFile, JSON.stringify(this.productos, null, 2));

    return nuevoProducto.id;
  }

  async getById(id) {
    const producto = this.productos.find((producto) => producto.id === id);
    return producto;
  }

  getAll() {
    return this.productos;
  }

  async deleteById(id) {
    try {
      const nuevoArray = this.productos.filter(
        (producto) => producto.id !== id
      );
      await fs.writeFile(this.pathFile, JSON.stringify(nuevoArray, null, 2));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteAll() {
    try {
      await fs.unlink(this.pathFile);
    } catch (error) {
      console.log(error.message);
    }
  }
}

const carrito = new Contenedor("./productos.txt");
carrito.open();

const producto = {
  title: "Laptop",
  price: 640,
  thumbnail: "https://m.media-amazon.com/images/I/61OvV27-44L._AC_SL1500_.jpg",
};

const producto2 = {
  title: "Patineta",
  price: 1542,
  thumbnail: "https://m.media-amazon.com/images/I/71PfGyStYmL._AC_SX425_.jpg",
};

const producto3 = {
  title: "Parlante bluetooth",
  price: 1231,
  thumbnail: "https://m.media-amazon.com/images/I/61qlhFddcFL._AC_SX425_.jpg",
};

// carrito.save(producto2);
// carrito.save(producto);
// carrito.save(producto3);
// console.log(carrito.getAll());
// carrito.getById(1).then(console.log);
// carrito.getById(2).then(console.log);
// carrito.deleteById(carrito.productos[0].id);

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(
    "<h1 style='font-size:60px; color:blue;'>Bienvenidx a primer app con Express JS </h1>"
  );
});

app.get("/productos", (req, res) => {
  res.send(`${JSON.stringify(carrito.getAll(), null, 2)}`);
});

app.get("/productoRandom", (req, res) => {
  const randomIndex = Math.floor(Math.random() * 3);

  res.send(`${JSON.stringify(carrito.productos[randomIndex], null, 2)}`);
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

connectedServer.on("error", (e) => console.log(e));
