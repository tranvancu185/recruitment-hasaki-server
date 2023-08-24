const jwt = require('jsonwebtoken');
const { API_TOKEN_KEY } = require('../utils/server.config');
const { User } = require("../db")

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token không hợp lệ.' });
  }
  try {
    const decoded = jwt.verify(token, API_TOKEN_KEY);
    const userData = await User.findOne({ where: { user_id : decoded.user_id } });
    if (!userData) {
      return res.status(403).json({ message: 'Thông tin người dùng không hợp lệ.' });
    }
    req.user = decoded;
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xác thực.' });
  }
  return next();
};

module.exports = authenticateToken;
