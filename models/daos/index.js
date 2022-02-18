let productosDao;
let carritoDao;

switch (process.env.DATABASE_TO_USE) {
  case "mongoDB":
    const {default: ProductosDaoMongoDB} = await import(
      "./productos/ProductosDaoMongo.js"
    );
    const {default: CarritoDaoMongo} = await import("./carrito/CarritoDaoMongo.js");
    productosDao = new ProductosDaoMongoDB();
    carritoDao = new CarritoDaoMongo();
    break;
  case "fireBase":
    const {default: ProductosDaoFireBase} = await import("");
    const {default: CarritoDaoFireBase} = await import("./carrito/CarritoDaoFireBase.js");
    productosDao = ProductosDaoFireBase;
    carritoDao = new CarritoDaoFireBase();
    break;
  default:
    const {default: ApiProductos} = await import("../productos/productos.api.js");
    const {default: ApiCarrito} = await import("../carrito/carrito.api.js");
    productosDao = new ApiProductos();
    carritoDao = new ApiCarrito();
    break;
}

export {productosDao, carritoDao};
