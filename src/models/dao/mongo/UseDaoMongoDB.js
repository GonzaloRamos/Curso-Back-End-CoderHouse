const MongoDBContainer = require("../../containers/MongoDBContainer");
const userSchema = require("../../schemas/userSchema");

class UserDao extends MongoDBContainer {
  static #instance = null;
  constructor() {
    super("user", userSchema);
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new UserDao();
    }
    return this.#instance;
  }

  async getByEmail(email) {
    try {
      const document = await this.model.findOne({email}, {__V: 0});
      if (!document) {
        const errorMessage = "Usuario o email invalido";
        throw new Error(JSON.stringify({code: 404, errorMessage}));
      } else {
        return document;
      }
    } catch (error) {
      throw new Error({code: 500, message: error.message});
    }
  }
}

module.exports = UserDao;
