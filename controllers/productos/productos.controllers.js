// import ApiProductos from "../../models/productos/productos.api.js";
// const productosApi = new ApiProductos();

import ProductosDao from "../../daos/productos/ProductosDao.js";

const productosApi = new ProductosDao();
const getAllProductsController = async (req, res) => {
  const {id} = req.params;

  if (id) {
    const producto = await productosApi.getAllOrById(id);
    return res.status(200).json(producto);
  }
  const productos = await productosApi.getAllOrById();
  return res.status(200).json(productos);
};

const addProductController = async (req, res) => {
  console.log(req.body);
  const {nombre, descripcion, codigo, fotoUrl, precio, stock} = req.body;

  if (nombre && descripcion && codigo && fotoUrl && precio && stock) {
    const producto = await productosApi.save({
      nombre,
      descripcion,
      codigo,
      fotoUrl,
      precio,
      stock,
    });
    return res.status(200).json(producto);
  }

  return res.status(400).json({error: "Faltan datos"});
};

const updateProductController = (req, res) => {
  const {id} = req.params;
  const {nombre, descripcion, codigo, fotoUrl, precio, stock} = req.body;

  if (nombre || descripcion || codigo || fotoUrl || precio || stock) {
    const producto = productosApi.updateProducto(id, {
      nombre,
      descripcion,
      codigo,
      fotoUrl,
      precio,
      stock,
    });
    return res
      .status(200)
      .json({message: `Se actualizo con los siguientes datos: ${producto}`});
  }
  return res.status(400).json({error: "No se proporciono ningun dato"});
};

const deleteProductController = (req, res) => {
  const {id} = req.params;
  if (id) {
    const producto = productosApi.deleteProducto(id);
    if (producto) {
      return res.status(200).json({message: `Se elimino el producto con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

export {
  getAllProductsController,
  addProductController,
  updateProductController,
  deleteProductController,
  productosApi,
};
