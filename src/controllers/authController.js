const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.signup = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password)
    throw new AppError("Email and password required", 400);

  if (password.length < 6)
    throw new AppError("Password must be at least 6 characters", 400);

  // duplicate check
  const [existing] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existing.length)
    throw new AppError("Email already registered", 400);

  const hash = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash]
  );

  const userId = result.insertId;

  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});


exports.login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const [users] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (!users.length)
    throw new AppError("Invalid credentials", 401);

  const user = users[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    throw new AppError("Invalid credentials", 401);

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });

});

exports.logout = asyncHandler(async (req, res) => {
  // Stateless JWT logout: client should delete token.
  // This route exists so frontend can call it and receive a standardized response.
  res.json({ message: "Logged out" });
});