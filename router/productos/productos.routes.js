const express = require("express");
const { Router } = express;
const router = Router();

const list = require("../../utils/productosClass");

const productsClass = new list();

router.get("/", (req, res) => {
  const productos = productsClass.getAll();
  res.json(productos);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const producto = productsClass.getById(id);
  if (producto) {
    return res.status(200).json(producto);
  }

  return res.status(404).json({ error: "Producto no encontrado" });
});

router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;

  if (title && price && thumbnail) {
    const producto = productsClass.save({ title, price, thumbnail });
    return res.status(201).json(producto);
  }

  return res.status(400).send("Faltan datos");
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  if (title && price && thumbnail) {
    productsClass.updateProducto(id, { title, price, thumbnail });
    return res.status(200).send("Producto actualizado");
  }

  return res.status(400).send("Faltan datos");
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    productsClass.deleteProducto(id);
    return res.status(200).send("Producto eliminado");
  }

  return res.status(404).send("Producto no encontrado");
});

router.post("/save", (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (title && price && thumbnail) {
    const producto = productsClass.save({ title, price, thumbnail });
    return res.status(201).json(producto);
  }

  return res.status(400).send("Faltan datos");
});

module.exports = router;
