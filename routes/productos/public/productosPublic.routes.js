import {Router} from "express";
import {getAllProductsController} from "../../../controllers/productos/productos.controllers.js";
const routeProductosPublic = Router();

routeProductosPublic.get("/:id?", getAllProductsController);

export default routeProductosPublic;
