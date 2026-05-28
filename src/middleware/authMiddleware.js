const jwt = require('jsonwebtoken');
const ApiResponse = require('../dto/response/apiResponse');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json(ApiResponse.error('Không có token xác thực'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(ApiResponse.error('Token không hợp lệ hoặc đã hết hạn'));
  }
}

module.exports = { authenticate };
