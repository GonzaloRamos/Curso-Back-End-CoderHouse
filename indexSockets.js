const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const { engine } = require("express-handlebars");
const path = require("path");
const rutasApi = require("./router/app.routers");
const listaProductos = require("./data/productos");

const chat = [];

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

app.use(express.static(__dirname + "/public"));
//Rutas
app.use("/api", rutasApi);

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

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("incomingMessage", (message) => {
    chat.push(message);
    io.sockets.emit("chat", chat);
  });
});

server.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
