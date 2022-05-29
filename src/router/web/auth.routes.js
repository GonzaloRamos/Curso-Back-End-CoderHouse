const express = require("express");
const authWebRouter = express.Router();
const passport = require("../../middlewares/auth/passport");

authWebRouter.get("/", (req, res) => {
  res.redirect("/home");
});

authWebRouter.get("/login", (req, res) => {
  const nombre = req.user;
  if (nombre) {
    res.redirect("/");
  } else {
    res.render("./pages/auth/login.ejs");
  }
});
authWebRouter.get("/register", (req, res) => {
  const nombre = req.user;
  if (nombre) {
    res.redirect("/");
  } else {
    res.render("./pages/auth/register.ejs");
  }
});

authWebRouter.get("/logout", (req, res) => {
  const nombre = req.user.email;
  req.logOut();
  console.log("user logout");
  res.render("logout.ejs", {nombre});
});

authWebRouter.get("/login-error", (req, res) => {
  const error = "Credenciales no validas";
  res.render("./pages/errors/error.ejs", {error});
});

authWebRouter.get("/register-error", (req, res) => {
  const error = "Usuario ya registrado";
  req.render("./pages/errors/error.ejs", {error});
});

authWebRouter.post(
  "/register",
  passport.authenticate("register", {failureRedirect: "/register-error"}),
  (req, res) => {
    res.redirect("/home");
  }
);

authWebRouter.post(
  "/login",
  passport.authenticate("login", {failureRedirect: "/login-error"}),
  (req, res) => {
    res.redirect("/home");
  }
);

module.exports = authWebRouter;
