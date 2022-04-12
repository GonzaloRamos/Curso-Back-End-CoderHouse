const express = require("express");
const router = express.Router();
const logErrors = require("../../../middlewares/errorHandlers");

const {
  getAllController,
  getByIdController,
  saveController,
  updateController,
  deleteController,
} = require("../../../controllers/productos.controllers");

router.get("/", getAllController);

router.get("/:id", getByIdController);

router.post("/save", saveController);

router.put("/:id", updateController);

router.delete("/:id", deleteController);

module.exports = router;
