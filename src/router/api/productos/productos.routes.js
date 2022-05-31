const express = require("express");
const router = express.Router();

const {
  getAllDataOrById,
  saveController,
  updateController,
  deleteController,
  deleteByFilterController,
} = require("../../../controllers/productos.controllers");

router.get("/:id?", getAllDataOrById);

router.post("/save", saveController);

router.put("/update/:id?", updateController);

router.delete("/deleteByFilter", deleteByFilterController);

router.delete("/deleteById/:id?", deleteController);

module.exports = router;
