const express = require("express");
const infoRoute = express.Router();
const CPUs = require("os").cpus().length;
const doCompression = require("../../utils/doCompression");

infoRoute.get("/info/:compress?", doCompression, (req, res) => {
  const info = {
    directorio: process.cwd(),
    memory: process.memoryUsage(),
    processId: process.pid,
    node: process.version,
    os: process.platform,
    CPUs,
    inputArgs: process.argv,
    path: process.execPath,
  };
  console.log(info);
  res.render("info.ejs", {info});
});

module.exports = infoRoute;
