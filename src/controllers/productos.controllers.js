const ProductosRepository = require("../models/repository/Productos.repository");

const getAllProductsController = async (ctx, next) => {
  try {
    const producto = await ProductosRepository.getAllProducts();
    ctx.body = {
      status: 200,
      data: producto,
      message: "Productos encontrados",
    };
  } catch (error) {
    const errorObject = JSON.parse(error.message);
    ctx.body = {message: errorObject.message, status: errorObject.error.code};
  }
};

const getProductByIdController = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const product = await ProductosRepository.getProductById(id);
    ctx.body = {
      status: 200,
      data: product,
      message: "Producto encontrado",
    };
  } catch (error) {
    const errorObject = JSON.parse(error.message);
    ctx.body = {status: errorObject.error.code, message: errorObject.message};
  }
};

const saveProductController = async (ctx, next) => {
  try {
    const result = await ProductosRepository.createProduct(ctx.request.body);

    ctx.body = {
      status: 201,
      data: result,
      message: "Producto creado",
    };
  } catch (error) {
    const errorObject = JSON.parse(error.message);
    ctx.body = {message: errorObject.message, status: errorObject.error.code};
  }
};

const updateProductController = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const updatedProduct = await ProductosRepository.updateProduct(id, ctx.request.body);
    ctx.body = {
      status: 201,
      data: updatedProduct,
      message: "Producto actualizado",
    };
  } catch (error) {
    const errorObject = JSON.parse(error.message);
    ctx.body = {message: errorObject.message, status: errorObject.error.code};
  }
};

const deleteProductByIdController = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const resultDeleted = await ProductosRepository.deleteProduct(id);
    ctx.body = {
      status: 204,
      data: resultDeleted,
      message: "Producto eliminado",
    };
  } catch (error) {
    const errorObject = JSON.parse(error.message);
    ctx.body = {message: errorObject.message, status: errorObject.error.code};
  }
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  saveProductController,
  updateProductController,
  deleteProductByIdController,
};
