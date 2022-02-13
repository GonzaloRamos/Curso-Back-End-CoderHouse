import express from "express";
import router from "./routes/index.routes.js";
import {initMongo} from "./config/mongoDB/mongoDB.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(router);

app.listen(PORT, () => {
  initMongo();
  console.log(`Database connected`);
  console.log(`Server is running on port ${PORT}`);
});
