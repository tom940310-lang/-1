const User = require('../model/user_model');

/**
 * 會員驗證與註冊控制器
 */
exports.register = async (req, res) => {
    try {
        const { studentId, email, password, name, department } = req.body;
        
        if (!email.endsWith('@ocu.edu.tw')) {
            return res.status(400).json({ success: false, message: '請使用僑光學校信箱 (@ocu.edu.tw) 進行驗證註冊' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: '該學生信箱已被註冊' });
        }

        const user = await User.create({ studentId, email, password, name, department });
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(401).json({ success: false, message: '學號信箱或密碼錯誤' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};