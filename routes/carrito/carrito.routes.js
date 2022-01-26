import { Router } from "express";
import { Carrito } from "../../models/carrito/carrito.api.js";

const routeCarrito = Router();

routeCarrito.post("/", (req, res) => {
  const carrito = new Carrito();
  res.status(200).json({
    id: carrito.id,
    timeStamp: carrito.timeStamp,
    productos: carrito.productos,
  });
});

routeCarrito.delete("/:id", (req, res) => {
  const { id } = req.params;
  const carrito = new Carrito(id);
  carrito.delete(id);
  res.status(200).json({
    message: "Carrito eliminado",
  });
});

routeCarrito.post("/:id/productos", (req, res) => {
  const { idCarrito } = req.params;
  const { id, title, price } = req.body;
  const carrito = new Carrito(idCarrito);
  carrito.save({ id, title, price });
  res.status(200).json({
    message: "Producto agregado",
  });
});
export default routeCarrito;
