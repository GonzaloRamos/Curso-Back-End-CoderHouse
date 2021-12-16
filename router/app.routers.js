const express = require("express");
const router = express.Router();

const rutaProductos = require("./productos/productos.routes");

//middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Rutas
router.use("/productos", rutaProductos);

module.exports = router;
