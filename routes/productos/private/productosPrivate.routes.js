import express from "express";
import {
  addProductController,
  updateProductController,
  deleteProductController,
} from "../../../controllers/productos/productos.controllers.js";

const routerProductosPrivate = express.Router();

routerProductosPrivate.post("/", addProductController);

routerProductosPrivate.put("/:id", updateProductController);

routerProductosPrivate.delete("/:id", deleteProductController);

export default routerProductosPrivate;
