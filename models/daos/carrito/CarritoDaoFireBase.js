import FireBaseContainter from "../../containers/FireBaseContainer";

//Manage mongoDB database

class CarritoDao extends FireBaseContainter {
  constructor() {
    super("carritos");
  }

  async save(carrito = []) {
    return carrito;
  }
}
