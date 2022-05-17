const MongoDBContainer = require("../../containers/MongoDBContainer");
const {chatSchema} = require("../../schemas/index");

class ChatDaoMongoDB extends MongoDBContainer {
  static #instance = null;
  constructor() {
    super("chats", chatSchema);
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new ChatDaoMongoDB();
    }
    return this.#instance;
  }
}

module.exports = ChatDaoMongoDB;
