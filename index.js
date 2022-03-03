const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// import rutas
const rutasApi = require("./router/api/app.routes");
const rutasWeb = require("./router/web/home.routes");
const rutasAuth = require("./router/web/auth.routes");

//import sessions
const session = require("express-session");
const MongoStore = require("connect-mongo");

//import dao chats
const configDB = require("./config/configDataBase");
const chatDao = require("./models/dao/index");
const getNormalizedData = require("./utils/getNormalizedData");

//Config server

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(
  session({
    store: MongoStore.create({mongoUrl: configDB.mongoDB.uri}),
    secret: "login",
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.set("view engine", "ejs");

const emitMensaje = async () => {
  const mensaje = await chatDao.getAllDataOrById();
  const normalizedData = getNormalizedData(mensaje);

  io.sockets.emit("chat", normalizedData);
};

//Rutas
app.use("/api", rutasApi);
app.use(rutasAuth);
app.use(rutasWeb);

io.on("connection", async (socket) => {
  emitMensaje();
  socket.on("incomingMessage", async (message) => {
    if (message) {
      await chatDao.createData(message);

      emitMensaje();
    }
  });
});

server.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
