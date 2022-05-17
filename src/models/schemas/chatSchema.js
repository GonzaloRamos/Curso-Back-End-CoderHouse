const Mongoose = require("mongoose");

const chatSchema = new Mongoose.Schema({
  author: {type: Object, required: true},
  texto: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
});

module.exports = chatSchema;
