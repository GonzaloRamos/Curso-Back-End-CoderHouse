import Mongoose from "mongoose";

const Schema = Mongoose.Schema;
const collection = "productos";

const ProductosSchema = new Schema({
  id: Mongoose.ObjectId,
  timeStamp: {type: Number, required: true, unique: true},
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true},
  codigo: {type: Number, required: true},
  fotoUrl: {type: String, required: true},
  precio: {type: Number, required: true},
  stock: {type: Number, required: true},
});

export const ProductosModel = Mongoose.model(collection, ProductosSchema);
