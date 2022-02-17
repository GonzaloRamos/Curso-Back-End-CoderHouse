import express from "express";
import router from "./routes/index.routes.js";
import ConectDB from "./models/ConectDB.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(router);

app.listen(PORT, () => {
  ConectDB.connection(process.env.DATABASE_TO_USE);
  console.log(`Database connected`);
  console.log(`Server is running on port ${PORT}`);
});
