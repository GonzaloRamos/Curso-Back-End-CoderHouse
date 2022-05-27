const Mongoose = require("mongoose");
const {mongoDB} = require("../../config/config");
const STATUS = require("../../config/constants/api.constants");
const ApiUtils = require("../../utils/Api.utils");
(async () => {
  await Mongoose.connect(mongoDB.uri);
  console.log("Conectado a MongoDB");
})();

class MongoDBContainer {
  #model;
  constructor(collection, schema) {
    this.#model = Mongoose.model(collection, schema);
  }

  async createData(data) {
    try {
      const dataComplete = {timeStamp: Date.now(), ...data};
      return await this.#model.create(dataComplete);
    } catch (error) {
      const newError = ApiUtils.formatErrorObject(STATUS.INTERNAL_ERROR, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async getAllDataOrById(ID) {
    try {
      if (ID) {
        const result = await this.#model.findById(ID);
        return result;
      }

      const result = await this.#model.find({}, {_id: 1, __v: 0});
      return result;
    } catch (error) {
      const newError = ApiUtils.formatErrorObject(
        STATUS.NOT_FOUND,
        `No se enontro un registro con ID: ${ID}`
      );
      throw new Error(JSON.stringify(newError));
    }
  }

  async updateData(ID, data) {
    try {
      if (!ID || ApiUtils.isEmpty(data)) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          `Error en la petición. No se proporciono ningun ID o data.`
        );
        throw new Error(JSON.stringify(newError));
      }
      const document = await this.#model.updateMany({_id: ID}, {new: true});

      return document;
    } catch (error) {
      console.error(error.message);
      const newError = ApiUtils.formatErrorObject(
        STATUS.BAD_REQUEST,
        `No se encontro un registro con ID ${ID}`
      );
      throw new Error(JSON.stringify(newError));
    }
  }

  async deleteData(ID) {
    try {
      if (!ID) {
        const newError = ApiUtils.formatErrorObject(
          STATUS.BAD_REQUEST,
          `No se proporciono ningun ID`
        );

        throw new Error(JSON.stringify(newError));
      }
      return await this.#model.findByIdAndDelete(ID);
    } catch (error) {
      const newError = ApiUtils.formatErrorObject(
        STATUS.NOT_FOUND,
        `No se encontro un registro para eliminar con ID ${ID}`
      );
      console.error(error.message);
      throw new Error(JSON.stringify(newError));
    }
  }
}

module.exports = MongoDBContainer;
