const {buildSchema} = require("graphql");

const productSchema = buildSchema(`
type Producto {
    id: ID,
    title: String,
    price: Float,
    image: String,
}
input ProductoInput {
    title: String,
    price: Float,
    image: String,

}
type Query {
    getAllProducts: [Producto],
    getProductById(id: ID!): Producto,
}
type Mutation {
    createProduct(producto: ProductoInput): Producto,
    updateProduct(id: ID!, producto: ProductoInput): Producto,
    deleteProduct(id: ID!): Producto,
}

`);
module.exports = productSchema;
