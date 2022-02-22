let productosDao;
let carritoDao;

switch (process.env.DATABASE_TO_USE) {
  case "mongoDB":
    const {default: ProductosDaoMongoDB} = await import(
      "./productos/ProductosDaoMongo.js"
    );
    const {default: CarritoDaoMongoDB} = await import("./carrito/CarritoDaoMongo.js");
    productosDao = new ProductosDaoMongoDB();
    carritoDao = new CarritoDaoMongoDB();
    break;
  case "fireBase":
    const {default: ProductosDaoFireBase} = await import("");
    const {default: CarritoDaoFireBase} = await import("./carrito/CarritoDaoFireBase.js");
    productosDao = ProductosDaoFireBase;
    carritoDao = new CarritoDaoFireBase();
    break;
  default:
    const {default: ProductosDaoFiles} = await import("./productos/ProductosDaoFiles.js");
    const {default: CarritoDaoFiles} = await import("./carrito/CarritoDaoFiles.js");
    productosDao = new ProductosDaoFiles();
    carritoDao = new CarritoDaoFiles();
    break;
}

export {productosDao, carritoDao};
