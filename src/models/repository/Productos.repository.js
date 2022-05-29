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
    this.productoDTO = new ProductoDto();
    this.productoDTOsList = [];
    ProductosRepository.#instance = this;
  }

  async getAllDataOrById(id = undefined) {
    try {
      if (id) {
        const productoFromDB = await productosDao.getAllDataOrById(id);
        this.productoDTO.id = productoFromDB._id;
        this.productoDTO.title = productoFromDB.title;
        this.productoDTO.price = productoFromDB.price;
        this.productoDTO.image = productoFromDB.image;
        this.productoDTO.description = productoFromDB.description;
        return this.productoDTO;
      }
      const productosFromDB = await productosDao.getAllDataOrById();
      productosFromDB.forEach((producto) => {
        this.productoDTO.id = producto._id;
        this.productoDTO.title = producto.title;
        this.productoDTO.price = producto.price;
        this.productoDTO.image = producto.image;
        this.productoDTO.description = producto.description;
        this.productoDTOsList.push(this.productoDTO);
      });
      return this.productoDTOsList;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createData(data) {
    try {
      const {title, price, image} = data;
      if (!title || !price || !image) {
        throw new Error("Faltan datos");
      }
      const result = await productosDao.createData({title, price, image});
      return result;
    } catch (error) {
      const newError = ApiUtils.formatErrorObject(
        STATUS.NOT_FOUND,
        `No se enontro un registro con ID: ${ID}`
      );
      throw new Error(newError);
    }
  }

  async updateData(id, data) {
    try {
      if (!id || ApiUtils.isEmpty(data)) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          `Error en la petición. No se proporciono ningun ID o data.`
        );
        throw new Error(JSON.stringify(newError));
      }
      const {title, price, image} = data;
      if (!price) {
        throw new Error(
          "No se puede actualizar el precio. Debe estar definido o ser mayor que 0."
        );
      }

      if (!image) {
        throw new Error(
          "No se puede actualizar la imagen. Debe ingresar una url valida."
        );
      }

      if (!title) {
        throw new Error("No se puede actualizar el titulo. Debe ingresar uno.");
      }

      const updateResult = await productosDao.updateData(id, data);

      return updateResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteData(id) {
    try {
      if (!id) {
        throw new Error("No se proporciono un ID");
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
}

const instance = new ProductosRepository();

module.exports = instance;
