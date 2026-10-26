const express = require('express');
const path = require('path');
const connectDB = require('../date/database_configuration');

const authRoutes = require('../routes/auth_routes');
const bookRoutes = require('../routes/book_routes');
const transactionRoutes = require('../routes/transaction_routes');

const app = express();

// 1. 初始化資料庫連線
connectDB();

// 2. 中間件 (Middleware) 設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../views')));

// 3. API 路由設定 (MVC Routes)
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/transactions', transactionRoutes);

// 4. 前端主頁面渲染
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index_main_view.html'));
});

// 啟動 Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[OCU 113 App] 僑光二手書拍賣系統已啟動：http://localhost:${PORT}`);
});