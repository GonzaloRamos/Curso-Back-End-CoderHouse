import {Router} from "express";
import {
  addProductoToCarritoController,
  createCarritoController,
  deleteCarritoController,
  deleteProductFromCarritoController,
  getAllProductsFromCarritoController,
} from "../../controllers/carrito/carrito.controllers.js";

const routeCarrito = Router();
routeCarrito.get("/:idCarrito?/productos", getAllProductsFromCarritoController);

routeCarrito.post("/", createCarritoController);
routeCarrito.post("/:idCarrito?/productos/:idProducto?", addProductoToCarritoController);

routeCarrito.delete("/:idCarrito?", deleteCarritoController);
routeCarrito.delete(
  "/:idCarrito?/productos/:idProducto",
  deleteProductFromCarritoController
);

export default routeCarrito;
