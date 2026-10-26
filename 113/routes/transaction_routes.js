const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

/**
 * 面交狀態與私訊對話 API 路由
 */
router.post('/', transactionController.startTransaction);
router.put('/:id/complete', transactionController.completeTransaction);
router.post('/messages', transactionController.sendMessage);

module.exports = router;