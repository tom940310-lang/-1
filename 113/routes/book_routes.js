const express = require('express');
const router = express.Router();
const bookController = require('../controller/book_controller');

/**
 * 二手書拍賣 API 路由
 */
router.get('/', bookController.getBooks);
router.post('/', bookController.createBook);
router.put('/:id/expire', bookController.markExpired);

module.exports = router;