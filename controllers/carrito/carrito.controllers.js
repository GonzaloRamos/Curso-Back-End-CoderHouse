import {carritoDao as carritoApi} from "../../models/daos/index.js";
import {productosDao as productosApi} from "../../models/daos/index.js";

const createCarritoController = async (req, res, next) => {
  try {
    const {state} = await carritoApi.createCarrito();
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const addProductoToCarritoController = async (req, res, next) => {
  try {
    const {idCarrito, idProducto} = req.params;

    if (idCarrito && idProducto) {
      const dataProduct = await productosApi.getAllDataOrById(idProducto);
      console.log(dataProduct);

      const {state} = await carritoApi.addProduct(idCarrito, idProducto, dataProduct);

      return res.status(state.serverStatus).json({...state});
    }
    return res.status(400).json({error: "Falta algun ID", idCarrito, idProducto});
  } catch (error) {
    next(error);
  }
};

const deleteCarritoController = async (req, res, next) => {
  try {
    const {idCarrito} = req.params;
    const {state} = await carritoApi.deleteAllCarrito(idCarrito);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const getAllProductsFromCarritoController = async (req, res, next) => {
  try {
    const {idCarrito} = req.params;
    const {state} = await carritoApi.getAllProducts(idCarrito);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const deleteProductFromCarritoController = async (req, res, next) => {
  try {
    const {idCarrito, idProducto} = req.params;

    const {state} = await carritoApi.deleteProductCarrito(idCarrito, idProducto);

    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

export {
  createCarritoController,
  deleteCarritoController,
  getAllProductsFromCarritoController,
  addProductoToCarritoController,
  deleteProductFromCarritoController,
};
