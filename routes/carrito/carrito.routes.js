import {Router} from "express";
import {
  addProductoToCarritoController,
  createCarritoController,
  deleteCarritoController,
  deleteProductoController,
  getAllProductsController,
} from "../../controllers/carrito/carrito.controllers.js";

const routeCarrito = Router();

routeCarrito.post("/", createCarritoController);

routeCarrito.delete("/:id?", deleteCarritoController);

routeCarrito.delete("/:id?/productos/:idProducto", deleteProductoController);

routeCarrito.get("/:id?/productos", getAllProductsController);

routeCarrito.post(
  "/:id?/productos/:idProducto",
  addProductoToCarritoController
);

export default routeCarrito;
