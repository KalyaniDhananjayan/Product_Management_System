const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

//non-parameter routes first
router.get("/report", auth, productController.getReport)

router.get("/", auth, productController.getProducts);
router.post("/", auth, productController.addProduct);
router.put("/:id", auth, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);
;

module.exports = router;
