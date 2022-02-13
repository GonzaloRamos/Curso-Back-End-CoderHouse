import Mongoose from "mongoose";

const URI = `mongodb+srv://gonzalo:${process.env.MONGO_PASS}@${process.env.MONGO_DATABASE}.1bu3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const initMongo = async () => {
  try {
    await Mongoose.connect(URI);
  } catch (error) {
    console.log(error.message);
  }
};
