const express = require("express");
const homeRoute = express.Router();
const path = require("path");
const {webAuth} = require("../../middlewares/auth/index");

homeRoute.get("/home", webAuth, (req, res) => {
  res.render("index.ejs", {
    nombre: req.user.email,
  });
});

homeRoute.get("/home/productos-test", webAuth, (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/productos-test.html"));
});

homeRoute.get("/home/info", webAuth, (req, res) => {
  const info = {
    directorio: process.cwd(),
    memory: process.memoryUsage(),
    processId: process.pid,
    node: process.version,
    os: process.platform,
    inputArgs: process.argv,
    path: process.execPath,
  };
  console.log(info.memory);
  res.render("info.ejs", {info});
});

module.exports = homeRoute;
