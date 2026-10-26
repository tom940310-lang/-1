const mongoose = require('mongoose');

/**
 * 二手書籍刊登 Schema
 */
const bookSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, '請輸入書籍名稱'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, '請輸入售價'],
        min: [0, '金額不得小於0']
    },
    category: {
        type: String,
        required: [true, '請選擇開課學院'],
        enum: ['商管學院', '設計與資訊學院', '觀光與餐旅學院', '通識課程']
    },
    condition: {
        type: String,
        required: [true, '請選擇書況標記'],
        enum: ['全新無劃記', '近全新 (僅少量劃記)', '五成新 (有重點筆記)', '較舊 (不影響閱讀)']
    },
    location: {
        type: String,
        required: [true, '請選擇偏好面交地點'],
        enum: ['僑光圖書館門口', '積健樓 (體育館)', '積德樓大廳', '圖資大樓 1F', '學生餐廳/全家前']
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'IN_TRANSACTION', 'COMPLETED', 'EXPIRED'],
        default: 'ACTIVE' // ACTIVE: 刊登中, IN_TRANSACTION: 面交中, COMPLETED: 已交易完成, EXPIRED: 下架/流標
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', bookSchema);