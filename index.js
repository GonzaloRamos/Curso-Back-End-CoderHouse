// Init imports
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

//importo clusters
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

//Importo log4js y loggers
const log4js = require("log4js");
const {warnLogger, errorLogger, infoLogger} = require("./log/logger/index");

// import rutas
const rutasApi = require("./router/api/app.routes");
const rutasWeb = require("./router/web/home.routes");
const rutasAuth = require("./router/web/auth.routes");
const infoRoute = require("./router/web/info.routes");

//import sessions
const session = require("express-session");
const MongoStore = require("connect-mongo");

//import dao chats
const configDB = require("./config/configDataBase");
const {chatDao} = require("./models/dao/index");
const getNormalizedData = require("./utils/getNormalizedData");

//import PORT Config
const {PORT, MODE} = require("./config/configServer");

//import passport
const passport = require("./middlewares/auth/passport");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use(
  session({
    store: MongoStore.create({mongoUrl: configDB.mongoDB.uri}),
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
// app.use(
//   log4js.connectLogger(logger, {
//     level: "auto",
//     statusRules: [
//       {from: 200, to: 299, level: "debug"},
//       {codes: [303, 304], level: "info"},
//       {codes: [404], level: "warn"},
//       {from: 500, to: 599, level: "error"},
//     ],
//   })
// );

app.use(
  log4js.connectLogger(infoLogger, {
    level: "info",
    statusRules: [{from: 200, to: 299, level: "info"}],
  })
);
app.use(
  log4js.connectLogger(warnLogger, {
    level: "warn",
    statusRules: [{codes: [404], level: "warn"}],
  })
);
app.use(
  log4js.connectLogger(errorLogger, {
    level: "error",
    statusRules: [{codes: [400], level: "error"}],
  })
);

//Config server
app.set("views", "./views");
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
app.use(infoRoute);

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
