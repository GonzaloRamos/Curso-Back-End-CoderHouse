import { Router } from "express";
import routeCarrito from "./carrito/carrito.routes.js";

const router = Router();

router.use("/carrito", routeCarrito);

router.get("/", (req, res) => {
  res.send("HOLAAA");
});

export default router;
