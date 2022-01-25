import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import publicRouteCarrito from "./carrito/publicRoute/carritoPublic.routes.js";

const router = Router();

router.use("/carrito", authMiddleware, publicRouteCarrito);

router.get("/", (req, res) => {
  res.send("HOLAAA");
});

export default router;
