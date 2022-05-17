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
  const {url} = req;
  warnLogger.warn(`Error al encontrar la página ${req.url} con método ${req.method}`);
  res.status(404).render("pages/errors/error404.ejs", {url});
});

module.exports = router;
