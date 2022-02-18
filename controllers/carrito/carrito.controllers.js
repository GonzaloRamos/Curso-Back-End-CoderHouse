import {carritoDao as carritoApi} from "../../models/daos/index.js";

const createCarritoController = (req, res) => {
  const id = carritoApi.createCarrito();
  return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
};

const deleteCarritoController = (req, res) => {
  const {id} = req.params;
  if (id) {
    const carrito = carritoApi.delete(id);
    if (carrito) {
      return res.status(200).json({message: `Se elimino el carrito con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el carrito"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const getAllProductsController = (req, res) => {
  const {id} = req.params;
  if (id) {
    const productos = carritoApi.getAllProducts(id);
    if (productos.length > 0) {
      return res.status(200).json(productos);
    }
    return res.status(400).json({error: "No se encontaron productos"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const addProductoToCarritoController = (req, res) => {
  const {id, idProducto} = req.params;

  if (id && idProducto) {
    const producto = productosApi.getAllOrById(idProducto);
    if (producto) {
      const carrito = carritoApi.addProducto(id, producto);
      if (carrito) {
        return res
          .status(200)
          .json({message: `Se agrego el producto con id: ${idProducto}`});
      }
      return res.status(400).json({error: "No se encontro el carrito"});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const deleteProductoController = (req, res) => {
  const {id, idProducto} = req.params;
  if (id && idProducto) {
    const producto = carritoApi.deleteProducto(id, idProducto);
    if (producto) {
      return res
        .status(200)
        .json({message: `Se elimino el producto con id: ${idProducto}`});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

export {
  createCarritoController,
  deleteCarritoController,
  getAllProductsController,
  addProductoToCarritoController,
  deleteProductoController,
};
