const MongoDBContainer = require("../../containers/mongo/MongoDBContainer");
const userSchema = require("../../schema/userSchema");

class UserDao extends MongoDBContainer {
  static #instance;
  constructor() {
    if (!!UserDao.#instance) {
      return UserDao.#instance;
    }
    super("users", userSchema);
    UserDao.#instance = this;
  }

  async getByEmail(email) {
    try {
      const document = await this.getByFilter({email});
      console.log("document", document);
      if (!document) {
        const errorMessage = "Usuario o email invalido";
        throw new Error(JSON.stringify({code: 404, errorMessage}));
      } else {
        return document;
      }
    } catch (error) {
      throw new Error(JSON.stringify({code: 500, message: error.message}));
    }
  }
}

module.exports = UserDao;
