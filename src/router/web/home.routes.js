const express = require("express");
const homeRoute = express.Router();
const {webAuth} = require("../../middlewares/auth/index");

homeRoute.get("/home/", webAuth, (req, res) => {
  res.render("index.ejs", {
    nombre: req.user.email,
  });
});

module.exports = homeRoute;
