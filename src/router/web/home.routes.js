const Router = require("koa-router");
const homeRoute = new Router({prefix: "/home"});
const {webAuth} = require("../../middlewares/auth/index");

homeRoute.get("/", (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.render("index", {
      nombre: req.user.email,
    });
  } else {
    ctx.redirect("/login");
  }
});

// function webAuth(ctx, next) {}

// function apiAuth(ctx, next) {
//   if (ctx.isAuthenticated()) {
//     next();
//   } else {
//     ctx.body = {status: 401, message: "no autorizado!"};
//   }
// }
module.exports = homeRoute;
