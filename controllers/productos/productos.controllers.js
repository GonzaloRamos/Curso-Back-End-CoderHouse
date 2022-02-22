import {productosDao as productosApi} from "../../models/daos/index.js";

const getAllProductsController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {state} = await productosApi.getAll(id);

    res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const addProductController = async (req, res, next) => {
  try {
    const {state} = await productosApi.addProduct(req.body);

    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const updateProductController = async (req, res, next) => {
  try {
    const {idProducto} = req.params;
    const {state} = await productosApi.updateProduct(idProducto, req.body);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const deleteProductController = async (req, res, next) => {
  try {
    const {idProducto} = req.params;
    const {state} = await productosApi.deleteProduct(idProducto);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

export {
  getAllProductsController,
  addProductController,
  updateProductController,
  deleteProductController,
};
