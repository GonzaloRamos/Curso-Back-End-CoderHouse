import {initMongo} from "../config/mongoDB/mongoDB.js";

export default class ConectDB {
  static connection(database) {
    switch (database) {
      case "mongo":
        initMongo();
        break;

      default:
        console.log("No database selected");
        break;
    }
  }
}
