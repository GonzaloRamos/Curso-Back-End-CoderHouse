import FireBaseContainter from "../../containers/FireBaseContainer";

//Manage mongoDB database

class ProductosDaoFireBase extends FireBaseContainter {
  constructor() {
    super("productos");
  }
}

export default ProductosDaoFireBase;
