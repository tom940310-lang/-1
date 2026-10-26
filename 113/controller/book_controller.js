const Book = require('../models/Book');

/**
 * 二手書控制器 (獲取列表、關鍵字搜尋、刊登、流標下架)
 */
exports.getBooks = async (req, res) => {
    try {
        const { category, search, maxPrice, noMark } = req.query;
        let query = { status: 'ACTIVE' };

        if (category && category !== 'all') query.category = category;
        if (search) query.title = { $regex: search, $options: 'i' };
        if (noMark === 'true') query.condition = '全新無劃記';
        if (maxPrice) query.price = { $lte: Number(maxPrice) };

        const books = await Book.find(query).populate('seller', 'name department ratingScore');
        res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.markExpired = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { status: 'EXPIRED' }, { new: true });
        res.status(200).json({ success: true, data: book, message: '書籍已成功下架/標記流標' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};