import { Router } from "express";
import { Carrito } from "../../models/carrito/carrito.api.js";
const routeCarrito = Router();

routeCarrito.post("/", (req, res) => {
  const carrito = new Carrito();
  res.status(200).json({
    id: carrito.id,
  });
});

routeCarrito.delete("/:id", (req, res) => {});

export default routeCarrito;
