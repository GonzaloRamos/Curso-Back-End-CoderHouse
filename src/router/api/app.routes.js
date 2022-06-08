const Router = require("koa-router");

const router = new Router({
  prefix: "/api",
});

const randomApi = require("./random/random.routes");
const rutaProductos = require("./productos/productos.routes");
const errorHandler = require("../../middlewares/errorHandlers");

//Rutas
router.use(rutaProductos.routes());
// router.use("/random", randomApi);

router.use(errorHandler);

module.exports = router;
