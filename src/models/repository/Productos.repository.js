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

  async getProductById({id}) {
    try {
      const productoFromDB = await productosDao.getAllDataOrById(id);
      const productDto = new ProductoDto();
      productDto.id = productoFromDB._id;
      productDto.title = productoFromDB.title;
      productDto.price = productoFromDB.price;
      productDto.image = productoFromDB.image;
      productDto.description = productoFromDB.description;
      return productDto;
    } catch (error) {
      throw new Error(error.message);
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

  async createProduct({producto}) {
    try {
      const {title, price, image} = producto;
      if (!title || !price || !image) {
        throw new Error("Faltan datos");
      }
      const result = await productosDao.createData({title, price, image});
      return result;
    } catch (error) {
      if (error.message === "Faltan datos") {
        const newError = ApiUtils.formatErrorObject(STATUS.BAD_REQUEST, error.message);
        throw new Error(JSON.stringify(newError));
      }
      throw new Error(error.message);
    }
  }

  async updateProduct({id, producto}) {
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

  async deleteProduct({id}) {
    try {
      if (!id) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se proporciono ningun ID."
        );
        throw new Error(JSON.stringify(newError));
      }
      const deleted = await productosDao.deleteData(id);
      const response = {
        doc: deleted._doc,
        message: `Se elimino satisfactoriammente el producto.`,
      };

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductByFilter({filter}) {
    try {
      if (ApiUtils.isEmpty(filter)) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se proporciono ningun filtro."
        );
        throw new Error(JSON.stringify(newError));
      }
      const deleted = await productosDao.deleteByFilter(filter);
      console.log("deleted", deleted);
      const response = {
        doc: deleted._doc,
        message: `Se elimino satisfactoriamente el producto.`,
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const instance = new ProductosRepository();
module.exports = instance;
