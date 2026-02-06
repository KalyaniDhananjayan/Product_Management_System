const express = require("express");
const path = require("path");

const router = express.Router();

const viewsPath = path.join(__dirname, "../views");

router.get("/login", (req, res) => {
  res.sendFile(path.join(viewsPath, "login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(viewsPath, "signup.html"));
});

router.get("/products", (req, res) => {
  res.sendFile(path.join(viewsPath, "products.html"));
});

module.exports = router;
