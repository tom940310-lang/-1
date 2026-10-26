const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction_controller');

/**
 * 面交狀態與私訊對話 API 路由
 */
router.post('/', transactionController.startTransaction);
router.put('/:id/complete', transactionController.completeTransaction);
router.post('/messages', transactionController.sendMessage);

module.exports = router;