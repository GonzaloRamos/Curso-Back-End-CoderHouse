const ProductosRepository = require("../models/repository/Productos.repository");

const getAllDataOrById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const producto = await ProductosRepository.getAllDataOrById(id);
    return res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
};

const saveController = async (req, res, next) => {
  try {
    const result = await ProductosRepository.createData(req.body);
    console.log("result", result);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const updatedProduct = await ProductosRepository.updateData(id, req.body);
    console.log("updatedProduct", updatedProduct);
    return res.status(200).json({...updatedProduct, mensaje: "Producto actualizado"});
  } catch (error) {
    next(error);
  }
};

const deleteController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const resultDeleted = await ProductosRepository.deleteData(id);
    res.status(200).json(resultDeleted);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDataOrById,
  saveController,
  updateController,
  deleteController,
};
