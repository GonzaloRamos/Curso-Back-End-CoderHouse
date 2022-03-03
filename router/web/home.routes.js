const express = require("express");
const homeRoute = express.Router();
const path = require("path");
const {webAuth} = require("../../middlewares/auth/index");

homeRoute.get("/home", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/public/pages/index.ejs"), {
    nombre: req.session.nombre,
  });
});

homeRoute.get("/home/productos-test", webAuth, (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/productos-test.html"));
});

module.exports = homeRoute;
