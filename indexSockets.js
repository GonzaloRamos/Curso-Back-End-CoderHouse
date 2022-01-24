const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const rutasApi = require("./router/app.routers");
const listaProductos = require("./data/productos");
const Chat = require("./data/chat");

const chat = new Chat();

const emitMensaje = () => {
  const mensaje = chat.getMessage();
  mensaje.then((data) => {
    io.sockets.emit("chat", data);
  });
};

app.use(express.static(__dirname + "/public"));
//Rutas
app.use("/api", rutasApi);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

io.on("connection", (socket) => {
  emitMensaje();
  socket.on("incomingMessage", (message) => {
    if (message.email) {
      chat.addMessage(message);
      emitMensaje();
    }
  });

  socket.broadcast.emit("onLoad", listaProductos);
});

server.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
