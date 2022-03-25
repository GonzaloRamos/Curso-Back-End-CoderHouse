const path = require("path");
require("dotenv").config({path: path.resolve(process.cwd(), ".env")});
module.exports = {
  mongoDB: {
    uri: `mongodb+srv://gonzalo:${process.env.MONGO_PASS}@${process.env.MONGO_DATABASE}.1bu3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  },
};
