const router = require('express').Router();
const orderController = require('../controllers/orders.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


router.get('/', authMiddleware, orderController.getOrders);  
router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;
