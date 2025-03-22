const router = require('express').Router();
const productController =require('../controllers/product.controller')


router.post('/', productController.create)
router.get('/', productController.getAll)

module.exports = router;