const path = require("path");

require("dotenv").config({path: path.resolve(process.cwd(), ".env")});
const yargs = require("yargs/yargs");
const {hideBin} = require("yargs/helpers");
const cliArgv = yargs(hideBin(process.argv));

const PORT = cliArgv.argv.port ? cliArgv.argv.port : process.env.PORT || 8080;
const MODE = cliArgv.argv.mode === "cluster" ? cliArgv.argv.mode : "fork";

module.exports = {
  mongoDB: {
    uri: `mongodb+srv://gonzalo:${process.env.MONGO_PASS}@${process.env.MONGO_DATABASE}.1bu3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  },
  PORT,
  MODE,
  DATABASE_TO_USE: process.env.DATABASE_TO_USE,
  factoryNames: cliArgv.argv.factoryNames
    ? cliArgv.array("factoryNames").argv.factoryNames
    : [],
};
