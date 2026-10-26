const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Message = require('../models/Message');

/**
 * 面交交易與私訊控制器
 */
exports.startTransaction = async (req, res) => {
    try {
        const { bookId, buyerId, meetLocation } = req.body;
        const book = await Book.findById(bookId);

        if (!book || book.status !== 'ACTIVE') {
            return res.status(400).json({ success: false, message: '該書籍不可交易或已被預訂' });
        }

        const transaction = await Transaction.create({
            book: book._id,
            seller: book.seller,
            buyer: buyerId,
            meetLocation: meetLocation || book.location
        });

        book.status = 'IN_TRANSACTION';
        await book.save();

        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.completeTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ success: false, message: '找不到交易紀錄' });

        transaction.status = 'COMPLETED';
        transaction.completedAt = Date.now();
        await transaction.save();

        await Book.findByIdAndUpdate(transaction.book, { status: 'COMPLETED' });

        res.status(200).json({ success: true, message: '面交交易順利完成！' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { transactionId, senderId, content } = req.body;
        const message = await Message.create({
            transaction: transactionId,
            sender: senderId,
            content
        });
        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};