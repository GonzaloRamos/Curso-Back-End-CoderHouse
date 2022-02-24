const {ProductosApi} = require("../models/index");
const apiProducto = new ProductosApi("productos");
const mockApi = require("../models/API/ProductosMock");
const mockProductoApi = new mockApi("producto");

const mockProductController = (req, res, next) => {
  const mockedProducts = mockProductoApi.populate(5);
  next();
  return res.status(200).json(mockedProducts);
};

const getAllController = async (req, res) => {
  const productos = await apiProducto.getAll();
  return res.status(200).json(productos);
};

const getByIdController = async (req, res) => {
  const {id} = req.params;
  const producto = await apiProducto.getById(id);
  if (producto) {
    return res.status(200).json(producto);
  }

  return res.status(404).json({error: "Producto no encontrado"});
};

const saveController = async (req, res) => {
  const {title, price, thumbnail} = req.body;
  if (title && price && thumbnail) {
    await apiProducto.save({title, price, imageURL: thumbnail});

    return res.status(200).redirect("/");
  }

  return res.status(400).send("Faltan datos");
};

const updateController = async (req, res) => {
  const {id} = req.params;
  const {title, price, thumbnail} = req.body;

  if (title && price && thumbnail) {
    const result = apiProducto.updateProducto(id, {title, price, thumbnail});
    if (result) {
      return res.status(200).send("Producto actualizado");
    }
    return res.status(404).send("Producto no encontrado");
  }

  return res.status(400).send("Faltan datos");
};

const deleteController = async (req, res) => {
  const {id} = req.params;

  if (id) {
    const result = await apiProducto.deleteProducto(id);

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
