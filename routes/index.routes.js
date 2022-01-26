import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import routeCarrito from "./carrito/carrito.routes.js";
import routeProductos from "./productos/productos.routes.js";

const router = Router();

router.use("/api/carrito", routeCarrito);

router.use("/api/productos", authMiddleware, routeProductos);

router.get("/", (req, res) => {
  res.send("HOLAAA");
});

export default router;
