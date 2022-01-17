const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

const chat = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
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
