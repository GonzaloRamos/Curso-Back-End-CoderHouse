import MongoDBContainer from "../../containers/MongoDBContainer";
import Mongoose from "mongoose";

const Schema = Mongoose.Schema;
const collection = "carritos";
const carritoSchema = new Schema({
  carrtio: {type: Array, required: true},
});

export default class CarritoDaoMongo extends MongoDBContainer {
  constructor() {
    super(collection, carritoSchema);
  }

  async save(carrito = {productos: []}) {
    return await super.save(carrito);
  }
}
