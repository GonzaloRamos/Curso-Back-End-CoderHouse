const MongoDBContainer = require("../../containers/mongo/MongoDBContainer");
const {chatSchema} = require("../../schema/index");

class ChatDaoMongoDB extends MongoDBContainer {
  static #instance;
  constructor() {
    if (!!ChatDaoMongoDB.#instance) {
      return ChatDaoMongoDB.#instance;
    }
    super("chats", chatSchema);
    ChatDaoMongoDB.#instance = this;
  }
}

module.exports = ChatDaoMongoDB;
