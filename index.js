const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const rutasApi = require("./router/app.routes");
const utils = require("util");

const chatDao = require("./models/dao/index");
const getNormalizedData = require("./utils/getNormalizedData");

const emitMensaje = async () => {
  const mensaje = await chatDao.getAllDataOrById();
  const normalizedData = getNormalizedData(mensaje);
  // console.log(mensaje);
  // console.log(utils.inspect(normalizedData, false, 10, true));
  io.sockets.emit("chat", normalizedData);
};

app.use(express.static(__dirname + "/public"));

//Rutas
app.use("/api", rutasApi);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/productos-test", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/productos-test.html"));
});

io.on("connection", async (socket) => {
  emitMensaje();
  socket.on("incomingMessage", async (message) => {
    if (message) {
      const msj = await chatDao.createData(message);

      emitMensaje();
    }
  });
});

server.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
