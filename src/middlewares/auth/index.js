function webAuth(ctx, next) {
  if (ctx.isAuthenticated()) {
    next();
  } else {
    ctx.redirect("/login");
  }
}

function apiAuth(ctx, next) {
  if (ctx.isAuthenticated()) {
    next();
  } else {
    ctx.body = {status: 401, message: "no autorizado!"};
  }
}

module.exports = {webAuth, apiAuth};
