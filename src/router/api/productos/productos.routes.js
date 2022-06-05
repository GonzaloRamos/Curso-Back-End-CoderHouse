const express = require("express");
const router = express.Router();

//Controllers

// const {
//   getAllDataOrById,
//   saveController,
//   updateController,
//   deleteController,
//   deleteByFilterController,
// } = require("../../../controllers/productos.controllers");

//Repository GraphQl
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../../models/repository/Productos.repository");

const {graphqlHTTP} = require("express-graphql");

router.use(
  "/",
  graphqlHTTP({
    schema: require("../../../models/schema/graphQL/productosSchemaGraphQL"),
    rootValue: {
      getAllProducts,
      getProductById,
      createProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: true,
  })
);

// router.get("/:id?", getAllDataOrById);

// router.post("/save", saveController);

// router.put("/update/:id?", updateController);

// router.delete("/deleteByFilter", deleteByFilterController);

// router.delete("/deleteById/:id?", deleteController);

module.exports = router;
