const Router = require("koa-router");
const authWebRouter = new Router();
const passport = require("../../middlewares/auth/passport");

//TODO: implementar rutas con KOA

authWebRouter.get("/", (ctx, next) => {
  ctx.redirect("/home");
});

authWebRouter.get("/login", async (ctx, next) => {
  const nombre = ctx.user;
  if (nombre) {
    await ctx.redirect("/");
  } else {
    await ctx.render("./login");
  }
});
authWebRouter.get("/register", (ctx, next) => {
  const nombre = req.user;
  if (nombre) {
    ctx.redirect("/");
  } else {
    ctx.render("./pages/auth/registers");
  }
});

authWebRouter.get("/logout", (ctx, next) => {
  const nombre = req.user.email;
  req.logOut();
  console.log("user logout");
  ctx.render("logouts", {nombre});
});

authWebRouter.get("/login-error", (ctx, next) => {
  const error = "Credenciales no validas";
  ctx.render("./pages/errors/errors", {error});
});

authWebRouter.get("/register-error", (ctx, next) => {
  const error = "Usuario ya registrado";
  req.render("./pages/errors/errors", {error});
});

authWebRouter.post(
  "/register",
  passport.authenticate("register", {failureRedirect: "/register-error"}),
  (ctx, next) => {
    ctx.redirect("/home");
  }
);

authWebRouter.post(
  "/login",
  passport.authenticate("login", {failureRedirect: "/login-error"}),
  (ctx, next) => {
    ctx.redirect("/home");
  }
);

module.exports = authWebRouter;
