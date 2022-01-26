import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import routeCarrito from "./carrito/carrito.routes.js";
import routeProductos from "./productos/productos.routes.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Rutas
router.use("/api/carrito", routeCarrito);
router.use("/api/productos", authMiddleware, routeProductos);

router.get("/", (req, res) => {
  res.send("HOLAAA");
});

export default router;
