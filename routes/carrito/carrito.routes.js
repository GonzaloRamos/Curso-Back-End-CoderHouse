import {Router} from "express";
import {
  createCarritoController,
  deleteCarritoController,
} from "../../controllers/carrito/carrito.controllers.js";

const routeCarrito = Router();

routeCarrito.post("/", createCarritoController);

routeCarrito.delete("/:id", deleteCarritoController);

export default routeCarrito;
