const { ProductosApi } = require("../models/index");
const apiProducto = new ProductosApi();

const getAllController = (req, res) => {
  const productos = apiProducto.getAll();
  return res.status(200).json(productos);
};

const getByIdController = (req, res) => {
  const { id } = req.params;
  const producto = apiProducto.getById(id);
  if (producto) {
    return res.status(200).json(producto);
  }

  return res.status(404).json({ error: "Producto no encontrado" });
};

const saveController = (req, res) => {
  const { title, price, thumbnail } = req.body;

  if (title && price && thumbnail) {
     apiProducto.save({ title, price, thumbnail });

      return res.status(200).redirect("/")

  }

  return res.status(400).send("Faltan datos");
};

const updateController = (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  if (title && price && thumbnail) {
    apiProducto.updateProducto(id, { title, price, thumbnail });
    return res.status(200).send("Producto actualizado");
  }

  return res.status(400).send("Faltan datos");
};

const deleteController = (req, res) => {
  const { id } = req.params;

  if (id) {
    const productoMensaje = apiProducto.deleteProducto(id);

    if (productoMensaje) {
      return res.status(200).json({ mensaje: "Producto eliminado" });
    }
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  return res.status(404).json({ mensaje: "Se debe proporcionar un id" });
};

module.exports = {
  getAllController,
  getByIdController,
  saveController,
  updateController,
  deleteController,
};
