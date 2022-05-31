const Mongoose = require("mongoose");
const {mongoDB} = require("../../../config/config");

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
      throw new Error(error.message);
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

  async updateData(id, data) {
    try {
      const document = await this.#model.updateOne({_id: id}, data, {new: true});

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

  async deleteByFilter(filter) {
    try {
      const result = await this.#model.deleteMany(filter, {multi: true});
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MongoDBContainer;
