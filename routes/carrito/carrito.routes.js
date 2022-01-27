import {Router} from "express";
import {
  addProductoToCarritoController,
  createCarritoController,
  deleteCarritoController,
  getAllProductsController,
} from "../../controllers/carrito/carrito.controllers.js";

const routeCarrito = Router();

routeCarrito.post("/", createCarritoController);

routeCarrito.delete("/:id?", deleteCarritoController);

routeCarrito.get("/:id?/productos", getAllProductsController);

routeCarrito.post(
  "/:id?/productos/:idProducto",
  addProductoToCarritoController
);

export default routeCarrito;
