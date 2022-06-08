const Router = require("koa-router");
const router = new Router();
const homeRoutes = require("./home.routes");
const infoRoutes = require("./info.routes");
const authRoutes = require("./auth.routes");
const {warnLogger} = require("../../log/logger/index");

router
  .use(authRoutes.routes())
  .use(authRoutes.allowedMethods())
  .use(homeRoutes.routes())
  .use(homeRoutes.allowedMethods())
  .use(infoRoutes.routes())
  .use(infoRoutes.allowedMethods());
// .get("*", (ctx) => {
//   warnLogger.warn(`Error al encontrar la página ${ctx.url} con método ${ctx.method}`);
//   ctx.render("pages/errors/error404.ejs", {url: ctx.url});
// });

module.exports = router;
