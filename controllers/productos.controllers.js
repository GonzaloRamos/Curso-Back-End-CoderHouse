const {productoDao: apiProducto} = require("../models/dao/index");
const MockApi = require("../models/API/ProductosMock");
const STATUS = require("../constants/api.constants");
const ApiUtils = require("../utils/Api.utils");
const MockProductoApi = new MockApi("producto");

const mockProductController = (req, res, next) => {
  try {
    const mockedProducts = MockProductoApi.populate(5);
    next();
    return res.status(200).json(mockedProducts);
  } catch (error) {
    next(error);
  }
};

const getAllDataOrById = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (id) {
      const producto = await apiProducto.getAllDataOrById(id);
      return res.status(200).json(producto);
    }
    const productos = await apiProducto.getAllDataOrById();
    return res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};

const saveController = async (req, res, next) => {
  try {
    const {title, price, image} = req.body;
    if (title && price && image) {
      await apiProducto.createData({title, price, image});

      return res.status(200).redirect("/");
    }
  } catch (error) {
    next(error);
  }
};

const updateController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {_doc} = await apiProducto.updateData(id, req.body);
    return res.status(200).json({..._doc, mensaje: "Producto actualizado"});
  } catch (error) {
    next(error);
  }
};

const deleteController = async (req, res, next) => {
  try {
    const {id} = req.params;

    const deleted = await apiProducto.deleteData(id);
    const response = {
      doc: deleted._doc,
      message: `Se elimino satisfactoriammente el producto.`,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  mockProductController,
  getAllDataOrById,
  saveController,
  updateController,
  deleteController,
};
