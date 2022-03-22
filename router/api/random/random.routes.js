const randomRoute = require("express").Router();
const getRandomController = require("../../../controllers/random.controller");
const {fork} = require("child_process");

randomRoute.get("/:quantity?", getRandomController);

module.exports = randomRoute;
