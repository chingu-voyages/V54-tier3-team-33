const router = require('express').Router();
const authController = require('../controllers/auth.controller')
const {authMiddleware} = require("../middlewares/auth.middleware");

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me',authMiddleware, authController.getMe)

module.exports = router;
