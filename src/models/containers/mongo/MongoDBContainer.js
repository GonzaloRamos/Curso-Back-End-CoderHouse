/* It's a class that creates a model from a collection and a schema, and then it has methods that allow
you to create, read, update and delete data from the database. */
const Mongoose = require("mongoose");
const {mongoDB} = require("../../../config/config");

(async () => {
  await Mongoose.connect(mongoDB.uri);
  console.log("Conectado a MongoDB");
})();

/* Creating a class that will be used to create a model. */
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

  /**
   * It returns all the data from the database or a single record if an ID is passed in.
   * @param ID - The ID of the document you want to retrieve.
   * @returns An array of objects.
   */
  async getAllDataOrById(ID) {
    try {
      if (ID) {
        const result = await this.#model.findById(ID);
        return result;
      }

      const result = await this.#model.find({}, {_id: 1, __v: 0});
      return result;
    } catch (error) {
      throw new Error(error.message);
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

  /**
   * It takes an ID as a parameter, and then it finds the document with that ID and deletes it.
   * @param ID - The ID of the document you want to delete.
   * @returns The result of the query.
   */
  async deleteData(ID) {
    try {
      return await this.#model.findByIdAndDelete(ID);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * It deletes all documents in the collection that match the filter
   * @param filter - The filter to use to find the documents to delete.
   * @returns The result of the deleteMany() method.
   */
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
