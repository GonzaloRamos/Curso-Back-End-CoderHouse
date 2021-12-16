const express = require("express");
const app = express();
const rutasApi = require("./router/app.routers");
const PORT = process.env.PORT || 8080;
app.use("/api", rutasApi);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

//Server listening
const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

connectedServer.on("error", (e) => console.log(e));
