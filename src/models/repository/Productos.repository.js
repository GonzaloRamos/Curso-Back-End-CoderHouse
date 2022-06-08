const STATUS = require("../../config/constants/api.constants");
const ApiUtils = require("../../utils/Api.utils");
const {productosDao} = require("../dao");
const ProductoDto = require("../dtos/Producto.dto.js");
//Repository de productos
class ProductosRepository {
  static #instance;
  constructor() {
    if (!!ProductosRepository.#instance) {
      return ProductosRepository.#instance;
    }
    ProductosRepository.#instance = this;
  }

  async getProductById(id) {
    try {
      if (!id) {
        const newError = ApiUtils.createError(
          STATUS.ERROR.NOT_FOUND,
          "Id no especificado"
        );
        throw new Error(JSON.stringify(newError));
      }

      const productoFromDB = await productosDao.getAllDataOrById(id);
      const productDto = new ProductoDto();
      productDto.id = productoFromDB._id;
      productDto.title = productoFromDB.title;
      productDto.price = productoFromDB.price;
      productDto.image = productoFromDB.image;
      productDto.description = productoFromDB.description;
      return productDto;
    } catch (error) {
      const newError = ApiUtils.formatErrorObject(
        STATUS.NOT_FOUND,
        `No se encontro el producto con id: ${id}`
      );
      throw new Error(JSON.stringify(newError));
    }
  }

  async getAllProducts() {
    try {
      const productosFromDB = await productosDao.getAllDataOrById();
      const lista = [];
      productosFromDB.forEach((producto) => {
        const productDto = new ProductoDto();
        productDto.id = producto._id.toString();
        productDto.title = producto.title;
        productDto.price = producto.price;
        productDto.image = producto.image;
        productDto.description = producto.description;
        lista.push(productDto);
      });
      return lista;
    } catch (error) {
      const newError = ApiUtils.formatErrorObject(STATUS.NOT_FOUND, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async createProduct(producto) {
    try {
      if (!producto) {
        throw new Error("No se proporciono ningun producto.");
      }
      const {title, price, image} = producto;
      if (!title) {
        throw new Error("No se puede crear un producto sin titulo.");
      }
      if (!price) {
        throw new Error("No se puede crear un producto sin precio.");
      }
      if (!image) {
        throw new Error("No se puede crear un producto sin imagen.");
      }

      const result = await productosDao.createData({title, price, image});
      return result;
    } catch (error) {
      const newError = ApiUtils.formatErrorObject(STATUS.BAD_REQUEST, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async updateProduct(id, producto) {
    try {
      if (!id || ApiUtils.isEmpty(producto)) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          `Error en la petición. No se proporciono ningun ID o producto.`
        );
        throw new Error(JSON.stringify(newError));
      }
      const {title, price, image} = producto;
      if (!price) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se puede actualizar el precio. Debe estar definido o ser mayor que 0."
        );
        throw new Error(JSON.stringify(newError));
      }

      if (!image) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se puede actualizar la imagen. Debe ingresar una url valida."
        );
        throw new Error(JSON.stringify(newError));
      }

      if (!title) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se puede actualizar el titulo. Debe ingresar un titulo valido."
        );
        throw new Error(JSON.stringify(newError));
      }
      await productosDao.updateData(id, producto);

      return {...producto};
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      if (!id) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se proporciono ningun ID."
        );
        throw new Error(newError);
      }
      const deleted = await productosDao.deleteData(id);
      if (deleted === null) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.NOT_FOUND,
          `No se encontro el producto con id: ${id}`
        );
        throw new Error(JSON.stringify(newError));
      }

      const response = {
        doc: deleted._doc,
        message: `Se elimino satisfactoriammente el producto.`,
      };

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const instance = new ProductosRepository();
module.exports = instance;
