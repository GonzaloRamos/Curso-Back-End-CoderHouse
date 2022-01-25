import { Router } from "express";

const publicRouteCarrito = Router();

publicRouteCarrito.get("/", (req, res) => {
  res.send("HOLAAA DESDE CARRUTI");
});

export default publicRouteCarrito;
