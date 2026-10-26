const mongoose = require('mongoose');

/**
 * 學生個資 Schema (限制使用 @ocu.edu.tw 僑光學生信箱)
 */
const userSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: [true, '請輸入學號'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, '請輸入信箱'],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@ocu\.edu\.tw$/, '必須為僑光科技大學信箱 (@ocu.edu.tw)']
    },
    password: {
        type: String,
        required: [true, '請輸入密碼']
    },
    name: {
        type: String,
        required: [true, '請輸入真實姓名/稱呼']
    },
    department: {
        type: String,
        required: [true, '請選擇所屬科系'],
        enum: ['資訊科技系', '財務金融系', '企業管理系', '國際貿易系', '觀光與休閒事業管理系', '餐旅管理系', '應用英語系', '多媒體與遊戲設計系']
    },
    ratingScore: {
        type: Number,
        default: 5.0,
        min: 1.0,
        max: 5.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);