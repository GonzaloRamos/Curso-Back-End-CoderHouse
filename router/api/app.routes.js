const express = require("express");
const router = express.Router();

const {mockProductController} = require("../../controllers/productos.controllers");
const randomApi = require("./random/random.routes");
const rutaProductos = require("./productos/productos.routes");
const errorHandler = require("../../middlewares/errorHandlers");

//middlewares
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Rutas
router.use("/productos/", rutaProductos);
router.use("/random/", randomApi);

router.get("/productos-test/", mockProductController);

router.use(errorHandler);

module.exports = router;
