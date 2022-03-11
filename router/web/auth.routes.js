const express = require("express");
const authWebRouter = express.Router();
const path = require("path");
const passport = require("../../middlewares/auth/passport");

authWebRouter.get("/", (req, res) => {
  res.redirect("/home");
});

authWebRouter.get("/login", (req, res) => {
  const nombre = req.user;
  if (nombre) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/public/pages/login.html"));
  }
});
authWebRouter.get("/register", (req, res) => {
  const nombre = req.user;
  if (nombre) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/public/pages/register.html"));
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
  res.render("error.ejs", {error});
});

authWebRouter.get("/register-error", (req, res) => {
  const error = "Usuario ya registrado";
  req.render("error.ejs", {error});
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
