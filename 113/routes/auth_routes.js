const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * 學生身分驗證 API 路由
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;