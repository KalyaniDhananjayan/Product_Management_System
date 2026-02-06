const pool = require("../config/db");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

/* ---------- Get Products ---------- */
exports.getProducts = asyncHandler(async (req, res) => {
  const [products] = await pool.query(
    "SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id]
  );

  res.json(products);
});

/* ---------- Add Product ---------- */
exports.addProduct = asyncHandler(async (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price === undefined || quantity === undefined)
    throw new AppError("name, price and quantity are required", 400);

  const p = parseFloat(price);
  const q = parseInt(quantity, 10);

  if (Number.isNaN(p) || p < 0) throw new AppError("Invalid price", 400);
  if (Number.isNaN(q) || q < 0) throw new AppError("Invalid quantity", 400);

  await pool.query(
    "INSERT INTO products (name, price, quantity, user_id) VALUES (?, ?, ?, ?)",
    [name, p, q, req.user.id]
  );

  res.status(201).json({ message: "Product added" });
});

/* ---------- Update Product ---------- */
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, quantity } = req.body;
  const productId = req.params.id;

  if (!name || price === undefined || quantity === undefined)
    throw new AppError("name, price and quantity are required", 400);

  const p = parseFloat(price);
  const q = parseInt(quantity, 10);

  if (Number.isNaN(p) || p < 0) throw new AppError("Invalid price", 400);
  if (Number.isNaN(q) || q < 0) throw new AppError("Invalid quantity", 400);

  const [result] = await pool.query(
    "UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ? AND user_id = ?",
    [name, p, q, productId, req.user.id]
  );

  if (result.affectedRows === 0) throw new AppError("Product not found", 404);

  res.json({ message: "Product updated" });
});

/* ---------- Delete Product ---------- */
exports.deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const [result] = await pool.query(
    "DELETE FROM products WHERE id = ? AND user_id = ?",
    [productId, req.user.id]
  );

  if (result.affectedRows === 0) throw new AppError("Product not found", 404);

  res.json({ message: "Product deleted" });
});

/* ---------- Reporting ---------- */
exports.getReport = asyncHandler(async (req, res) => {
  const [rowsCount] = await pool.query(
    "SELECT COUNT(*) AS totalProducts FROM products WHERE user_id = ?",
    [req.user.id]
  );

  const [rowsValue] = await pool.query(
    "SELECT SUM(price * quantity) AS totalValue FROM products WHERE user_id = ?",
    [req.user.id]
  );

  const totalProducts = (rowsCount[0] && rowsCount[0].totalProducts) || 0;
  const totalInventoryValue = (rowsValue[0] && rowsValue[0].totalValue) || 0;

  res.json({ totalProducts, totalInventoryValue });
});
