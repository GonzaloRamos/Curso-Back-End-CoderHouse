const express = require("express");
const rutasApi = require("./router/app.routers");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const listaProductos = require("./data/productos");

//Middlewares
// app.use(express.static(path.resolve(__dirname, "./public")));

//Views engine

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "./views/pug"));



//Rutas
app.use("/api", rutasApi);


app.get("/", (req, res) => {
  res.render("partials/main", {
    mostrarProductos: false,
    productos: listaProductos,
  });
});

app.get("/productos", (req, res) => {
  res.render("partials/main", {
    mostrarProductos: true,
    productos: listaProductos,
  });
});

//Server listening
const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

connectedServer.on("error", (e) => console.log(e));
