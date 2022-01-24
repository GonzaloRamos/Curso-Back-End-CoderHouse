import express from "express";
import path from "path";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
