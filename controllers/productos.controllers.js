const {productoDao: apiProducto} = require("../models/dao/index");
const mockApi = require("../models/API/ProductosMock");
const mockProductoApi = new mockApi("producto");
const {errorLogger} = require(process.cwd() + "/log/logger/index.js");

const mockProductController = (req, res, next) => {
  const mockedProducts = mockProductoApi.populate(5);
  next();
  return res.status(200).json(mockedProducts);
};

const getAllController = async (req, res) => {
  const productos = await apiProducto.getAllDataOrById();
  return res.status(200).json(productos);
};

const getByIdController = async (req, res) => {
  const {id} = req.params;
  const producto = await apiProducto.getAllDataOrById(id);
  if (producto) {
    return res.status(200).json(producto);
  }

  return res.status(404).json({error: "Producto no encontrado"});
};

const saveController = async (req, res) => {
  const {title, price, image} = req.body;
  if (title && price && image) {
    await apiProducto.createData({title, price, image});

    return res.status(200).redirect("/");
  }

  return res.status(400).json({error: "Faltan datos"});
};

const updateController = async (req, res) => {
  const {id} = req.params;
  const {title, price, thumbnail} = req.body;

  if (title && price && thumbnail) {
    const result = apiProducto.updateData(id, {title, price, image});
    if (result) {
      return res.status(200).json({mensaje: "Producto actualizado"});
    }
    return res.status(404).json({error: "Producto no encontrado"});
  }

  return res.status(400).json({error: "Faltan datos"});
};

const deleteController = async (req, res) => {
  const {id} = req.params;

  if (id) {
    const result = await apiProducto.deleteData(id);

    if (result) {
      return res.status(200).json({mensaje: "Producto eliminado"});
    }
    return res.status(404).json({mensaje: "Producto no encontrado"});
  }

  return res.status(404).json({mensaje: "Se debe proporcionar un id"});
};

module.exports = {
  mockProductController,
  getAllController,
  getByIdController,
  saveController,
  updateController,
  deleteController,
};
