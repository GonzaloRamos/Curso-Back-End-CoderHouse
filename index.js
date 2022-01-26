import express from "express";
import router from "./routes/index.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(router);
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
