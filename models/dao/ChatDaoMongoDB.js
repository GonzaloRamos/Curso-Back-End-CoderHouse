const MongoDBContainer = require("../containers/MongoDBContainer");
const {chatSchema} = require("../schemas/index");

let instance = null;
class ChatDaoMongoDB extends MongoDBContainer {
  constructor() {
    if (!instance) {
      super("chats", chatSchema);
      instance = this;
    } else {
      return instance;
    }
  }
}

module.exports = ChatDaoMongoDB;
