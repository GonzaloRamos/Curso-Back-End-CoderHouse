const Mongoose = require("mongoose");
const {mongoDB} = require("../../../config/config");
const STATUS = require("../../../config/constants/api.constants");
const ApiUtils = require("../../../utils/Api.utils");

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
      throw new Error(JSON.stringify(newError));
    }
  }

  async updateData(ID, data) {
    try {
      const document = await this.#model.updateOne({_id: ID}, data, {new: true});
      xº;
      return document;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByFilter(filter) {
    try {
      const result = await this.#model.findOne(filter);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteData(ID) {
    try {
      return await this.#model.findByIdAndDelete(ID);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MongoDBContainer;
