const {workingDao: apiProducto} = require("../models/dao/index");

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
  getAllDataOrById,
  saveController,
  updateController,
  deleteController,
};
