const faker = require("faker");

faker.locale = "es";

const createProductItem = () => ({
  title: faker.commerce.productName(),
  price: faker.commerce.price(100, 5000, 2, "$"),
  imageURL: faker.image.avatar(),
});

module.exports = {
  createProductItem,
};
