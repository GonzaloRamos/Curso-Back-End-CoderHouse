import { Router } from "express";

const routeProductos = Router();

routeProductos.get("/", (req, res) => {
  res.send("HOLAAA DESDE PRODUCTOS");
});

export default routeProductos;
