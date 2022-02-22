import {Router} from "express";
import {
  addProductoToCarritoController,
  createCarritoController,
  deleteCarritoController,
  deleteProductFromCarritoController,
  getAllProductsFromCarritoController,
} from "../../controllers/carrito/carrito.controllers.js";

const routeCarrito = Router();

routeCarrito.post("/", createCarritoController);

routeCarrito.delete("/:idCarrito?", deleteCarritoController);

routeCarrito.delete(
  "/:idCarrito?/productos/:idProducto",
  deleteProductFromCarritoController
);

routeCarrito.get("/:idCarrito?/productos", getAllProductsFromCarritoController);

routeCarrito.post("/:idCarrito?/productos/:idProducto?", addProductoToCarritoController);

export default routeCarrito;
