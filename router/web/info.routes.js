const express = require("express");
const infoRoute = express.Router();

infoRoute.get("/info", (req, res) => {
  const info = {
    directorio: process.cwd(),
    memory: process.memoryUsage(),
    processId: process.pid,
    node: process.version,
    os: process.platform,
    inputArgs: process.argv,
    path: process.execPath,
  };
  res.render("info.ejs", {info});
});

module.exports = infoRoute;
