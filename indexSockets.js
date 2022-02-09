const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const rutasApi = require("./router/app.routers");

const {ChatApi} = require("./models/index");

const chat = new ChatApi("chat");

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

io.on("connection", async (socket) => {
  emitMensaje();
  socket.on("incomingMessage", async (message) => {
    if (message.email) {
      await chat.addMessage(message);
      emitMensaje();
    }
  });
});

server.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
