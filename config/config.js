const path = require("path");
require("dotenv").config({path: path.resolve(process.cwd(), ".env")});
const yargs = require("yargs/yargs");
const {hideBin} = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const PORT = argv.port ? argv.port : process.env.PORT || 8080;
const MODE = argv.mode === "cluster" ? argv.mode : "fork";

module.exports = {
  mongoDB: {
    uri: `mongodb+srv://gonzalo:${process.env.MONGO_PASS}@${process.env.MONGO_DATABASE}.1bu3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  },
  PORT,
  MODE,
  DATABASE_TO_USE: process.env.DATABASE_TO_USE,
};
