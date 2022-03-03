const express = require("express");
const router = express.Router();

const {mockProductController} = require("../../controllers/productos.controllers");

const rutaProductos = require("./productos/productos.routes");

//middlewares
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Rutas
router.use("/productos", rutaProductos);

router.get("/productos-test", mockProductController);

module.exports = router;
