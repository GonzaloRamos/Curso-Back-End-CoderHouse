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

app.use(express.static(__dirname + "/public"));
//Rutas
app.use("/api", rutasApi);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("incomingMessage", (message) => {
    chat.push(message);
    io.sockets.emit("chat", chat);
  });

  socket.emit("onLoad", listaProductos);
});

server.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
