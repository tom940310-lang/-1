const mongoose = require('mongoose');

/**
 * 交易狀態追蹤 Schema (面交中 / 成功 / 流標下架)
 */
const transactionSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'EXPIRED'],
        default: 'IN_PROGRESS'
    },
    meetLocation: {
        type: String,
        required: true
    },
    meetTime: {
        type: String,
        default: '雙方相談約定中'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);