const mongoose = require('mongoose');

/**
 * 僑光科技大學二手書網 - MongoDB 資料庫連線設定
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ocu_book_exchange', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`[Database] MongoDB 連線成功: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[Database Error] 資料庫連線失敗: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;