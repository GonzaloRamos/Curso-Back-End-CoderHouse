const MongoDBContainer = require("../containers/MongoDBContainer");
const {chatSchema} = require("../schemas/index");

class ChatDaoMongoDB extends MongoDBContainer {
  constructor() {
    super("chats", chatSchema);
  }
}

module.exports = ChatDaoMongoDB;
