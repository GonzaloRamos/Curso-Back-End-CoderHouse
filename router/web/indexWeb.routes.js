const express = require("express");
const router = express.Router();
const homeRoutes = require("./home.routes");
const infoRoutes = require("./info.routes");
const authRoutes = require("./auth.routes");
const {warnLogger} = require("../../log/logger/index");

router.use(homeRoutes);
router.use(infoRoutes);
router.use(authRoutes);
router.get("*", (req, res) => {
  warnLogger.warn(`Error al encontrar la página ${req.url} con método ${req.method}`);
  res.status(404).send("Pagina 404 en construccion =)!");
});

module.exports = router;
