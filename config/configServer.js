const yargs = require("yargs/yargs");
const {hideBin} = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const PORT = argv.port ? argv.port : process.env.PORT || 8080;
const MODE = argv.mode === "cluster" ? argv.mode : "fork";

module.exports = {PORT, MODE};
