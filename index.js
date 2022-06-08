// Init imports
const path = require("path");
//Koa
const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const serve = require("koa-static");
const render = require("koa-ejs");

const http = require("http");
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
const session = require("koa-session");
const MongoStore = require("connect-mongo");

//import dao chats
const {chatDao} = require("./src/models/dao/index");

//import Config
const {PORT, MODE, mongoDB} = require("./src/config/config");

//import passport
const passport = require("./src/middlewares/auth/passport");

//Template engine
render(app, {
  root: path.join(__dirname, "src", "views"),
  layout: "layout",
  viewExt: "ejs",
  async: true,
  cache: false,
  debug: true,
});

app.keys = ["login"];

//Middlewares
app
  .use(koaBody())
  .use(serve("./src/public"))
  .use(passport.initialize())
  .use(passport.session())
  .use(
    session(
      {
        store: MongoStore.create({mongoUrl: mongoDB.uri}),
        secret: "login",
        rolling: true,
        maxAge: 100000,
      },
      app
    )
  )
  .use(rutasWeb.routes())
  .use(rutasWeb.allowedMethods())
  .use(rutasApi.routes())
  .use(rutasApi.allowedMethods());

// .use(
//   log4js.connectLogger(infoLogger, {
//     level: "auto",
//     statusRules: [
//       {from: 200, to: 304, level: "info"},
//       {codes: [404], level: "warn"},
//       {from: 500, to: 599, level: "error"},
//     ],
//   })
// );

const emitMensaje = async () => {
  const mensaje = await chatDao.getAllDataOrById();
  const normalizedData = Utils.getNormalizedData(mensaje);

  io.sockets.emit("chat", normalizedData);
};

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
    app.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`, `Worker ${process.pid} started`);
    });
  }
} else {
  app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`, `Worker ${process.pid} Fork`);
  });
}
