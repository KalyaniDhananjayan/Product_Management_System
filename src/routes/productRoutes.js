const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

router.get("/", auth, productController.getProducts);
router.post("/", auth, productController.addProduct);
router.put("/:id", auth, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);

// Place non-parameter routes before parameterized ones to avoid accidental matches
router.get("/report", auth, productController.getReport);

module.exports = router;
