let chatDao;

if (process.env.DATABASE_TO_USE === "mongoDB") {
  const ChatDaoMongoDB = require("./ChatDaoMongoDB");
  chatDao = new ChatDaoMongoDB();
}

module.exports = chatDao;
