const STATUS = require("../../config/constants/api.constants");
const Utils = require("../../utils/Utils");

class ProductosUtils extends Utils {
  constructor(resource) {
    this.resource = resource;
  }

  static populate(qty = 50) {
    try {
      const mockedItems = [];
      for (let i = 1; i <= qty; i++) {
        const newItem = this.createItem(this.resource);

        mockedItems.push(newItem);
      }
      return mockedItems;
    } catch (error) {
      throw new Error({
        error: STATUS.INTERNAL_ERROR,
        message: `Error al procesar la petición`,
      });
    }
  }

  static createItem(resource) {
    const newItems = {
      producto: Utils.createProductItem(),
    };
    return newItems[resource];
  }
}

module.exports = ProductosUtils;
