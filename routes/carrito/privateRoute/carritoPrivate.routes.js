import { Router } from "express";

const routeCarrito = Router();

routeCarrito.get("/", (req, res) => {
  res.send("HOLAAA DESDE CARRUTI");
});

export default routeCarrito;
