import express from "express";
import {
  addProductController,
  updateProductController,
  deleteProductController,
} from "../../../controllers/productos/productos.controllers.js";

const routerProductosPrivate = express.Router();

routerProductosPrivate.post("/", addProductController);

routerProductosPrivate.put("/:idProducto?", updateProductController);

routerProductosPrivate.delete("/:idProducto?", deleteProductController);

export default routerProductosPrivate;
