// Init imports
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const Utils = require("./src/utils/Utils");

//import clusters
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

//Import log4js y loggers
const log4js = require("log4js");
const {infoLogger} = require("./src/log/logger/index");

// import rutas
const rutasApi = require("./src/router/api/app.routes");
const rutasWeb = require("./src/router/web/indexWeb.routes");

//import sessions
const session = require("express-session");
const MongoStore = require("connect-mongo");

//import dao chats
const {chatDao} = require("./src/models/dao/index");

//import Config
const {PORT, MODE, mongoDB} = require("./src/config/config");

//import passport
const passport = require("./src/middlewares/auth/passport");

//Config server
app.set("views", "./src/views");
app.set("view engine", "ejs");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(
  session({
    store: MongoStore.create({mongoUrl: mongoDB.uri}),
    secret: "login",
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 100000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  log4js.connectLogger(infoLogger, {
    level: "auto",
    statusRules: [
      {from: 200, to: 304, level: "info"},
      {codes: [404], level: "warn"},
      {from: 500, to: 599, level: "error"},
    ],
  })
);
const emitMensaje = async () => {
  const mensaje = await chatDao.getAllDataOrById();
  const normalizedData = Utils.getNormalizedData(mensaje);

  io.sockets.emit("chat", normalizedData);
};

//Rutas
app.use("/api", rutasApi);
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

if (MODE === "cluster") {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    server.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`, `Worker ${process.pid} started`);
    });
  }
} else {
  server.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`, `Worker ${process.pid} Fork`);
  });
}
