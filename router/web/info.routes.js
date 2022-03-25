const express = require("express");
const infoRoute = express.Router();
const CPUs = require("os").cpus().length;
infoRoute.get("/info", (req, res) => {
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
  res.render("info.ejs", {info});
});

module.exports = infoRoute;
