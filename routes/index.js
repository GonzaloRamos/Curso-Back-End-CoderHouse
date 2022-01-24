import { Router } from "express";
import carrito from "./carrito/carrito.routes";

const router = Router();

router.use("/", carrito);

router.get("/", (req, res) => {
  res.send("HOLAAA");
});

export default router;
