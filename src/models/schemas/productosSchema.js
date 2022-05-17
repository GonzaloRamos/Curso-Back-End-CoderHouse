const Mongoose = require("mongoose");

const productoSchema = new Mongoose.Schema({
  title: {type: String, required: true, unique: false},
  price: {type: Number, required: true, min: [0, "Precio no puede ser menor que 0"]},
  image: {
    type: String,
    required: true,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
      "URL invalida",
    ],
  },
  timeStamp: {type: Number, required: true},
});

module.exports = productoSchema;
