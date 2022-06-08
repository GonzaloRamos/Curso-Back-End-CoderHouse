const Router = require("koa-router");
const router = new Router({
  prefix: "/productos",
});

//Controllers

const {
  getAllProductsController,
  getProductByIdController,
  saveProductController,
  updateProductController,
  deleteProductByIdController,
} = require("../../../controllers/productos.controllers");

router
  .get("/", getAllProductsController)

  .get("/:id", getProductByIdController)

  .post("/save", saveProductController)

  .put("/update/:id", updateProductController)

  .delete("/deleteById/:id", deleteProductByIdController);

module.exports = router;
