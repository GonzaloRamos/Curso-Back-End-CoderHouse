const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("connected");
});

server.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
