import { Router } from "express";

const carrito = Router();

carrito.use("/carrito");

carrito.get("/", (req, res) => {
  res.send("HOLAAA DESDE CARRITO");
});

export default carrito;
