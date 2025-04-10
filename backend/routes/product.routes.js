const router = require("express").Router();
const productController = require("../controllers/product.controller");

// if this line is uncommented, there will be errors in the console
// router.post('/', productController.create)
router.get("/", productController.getAll);

module.exports = router;
