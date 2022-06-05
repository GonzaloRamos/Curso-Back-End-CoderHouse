const ProductosRepository = require("../models/repository/Productos.repository");

const getAllProductsController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const producto = await ProductosRepository.getAllProducts(id);
    return res.status(200).json(producto);
  } catch (error) {
    next(error.message);
  }
};

const saveProductController = async (req, res, next) => {
  try {
    const result = await ProductosRepository.createProduct(req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error.message);
  }
};

const updateProductController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const updatedProduct = await ProductosRepository.updateProduct(id, req.body);
    return res.status(200).json({...updatedProduct, mensaje: "Producto actualizado"});
  } catch (error) {
    next(error.message);
  }
};

const deleteProductByIdController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const resultDeleted = await ProductosRepository.deleteProduct(id);
    res.status(200).json(resultDeleted);
  } catch (error) {
    next(error.message);
  }
};

const deleteProductByFilterController = async (req, res, next) => {
  try {
    const resultDeleted = await ProductosRepository.deleteByFilter(req.query);

    res.status(200).json(resultDeleted);
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getAllProductsController,
  deleteProductByFilterController,
  saveProductController,
  updateProductController,
  deleteProductByIdController,
};
