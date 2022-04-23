const express = require("express");
const router = express.Router();

const {
  getAllDataOrById,
  saveController,
  updateController,
  deleteController,
} = require("../../../controllers/productos.controllers");

router.get("/:id?", getAllDataOrById);

router.post("/save", saveController);

router.put("/:id?", updateController);

router.delete("/:id?", deleteController);

module.exports = router;
