require("dotenv").config();

const express = require("express");
const path = require("path");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const pageRoutes = require("./src/routes/pageRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const app = express();

/* ---- Middleware ---- */

// Parse JSON
app.use(express.json());

// Serve static files, CSS + client JS
app.use(express.static(path.join(__dirname, "src/public")));

/* ---- Routes ---- */

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/", pageRoutes);

/* ---- Basic Route ---- */

app.get("/", (req, res) => {
  // Redirect to login — client-side will send logged-in users to /products
  res.redirect("/login");
});

/* ---- Error Handler ---- */

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Centralized error handler
app.use(errorMiddleware);

//start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
