const express = require("express");
const rutasApi = require("./router/app.routers");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;
const listaProductos = require("./data/productos");

//Middlewares
// app.use(express.static(path.resolve(__dirname, "./public")));

//Views engine

/*            --------        HANDLEBARS    --------     

app.engine(
  "handlebars",
  engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/handlebars/layouts"),
    partialsDir: path.resolve(__dirname, "./views/handlebars/partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/handlebars"));
*/

/*          --------        EXPRESS-PUG    --------

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "./views/pug"));
*/

/*          --------        EXPRESS-EJS    --------      */
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views/ejs"));

//Rutas
app.use("/api", rutasApi);

/*        --------        Handle Bars    -------- 

app.get("/", (req, res) => {
  res.render("index", {
    mostrarProductos: false,
    productos: listaProductos,
  });
});

app.get("/productos", (req, res) => {
  res.render("index", {
    mostrarProductos: true,
    productos: listaProductos,
  });
});
*/

/*     ----- PUG-------


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
*/

app.get("/", (req, res) => {
  res.render("index", {
    mostrarProductos: false,
    productos: listaProductos,
  });
});

app.get("/productos", (req, res) => {
  res.render("index", {
    mostrarProductos: true,
    productos: listaProductos,
  });
});

//Server listening
const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

connectedServer.on("error", (e) => console.log(e));
