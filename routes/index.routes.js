import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import routeCarrito from "./carrito/carrito.routes.js";
import routerProductosPrivate from "./productos/private/productosPrivate.routes.js";
import routeProductosPublic from "./productos/public/productosPublic.routes.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Rutas
router.use("/api/carrito", routeCarrito);
router.use("/api/productos", routeProductosPublic);
router.use("/api/productos", authMiddleware, routerProductosPrivate);
router.use("*", (req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `La ruta ${req.baseUrl} con el metodo ${req.method} no esta implementado`,
  });
});

router.get("/", (req, res) => {
  res.send("HOLAAA");
});

export default router;
