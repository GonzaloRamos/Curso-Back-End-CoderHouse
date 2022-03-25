const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

//importo clusters
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

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
