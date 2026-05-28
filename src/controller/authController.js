const authService = require('../service/authService');
const RegisterRequest = require('../dto/request/registerRequest');
const LoginRequest = require('../dto/request/loginRequest');
const ApiResponse = require('../dto/response/apiResponse');

const authController = {
  async register(req, res) {
    try {
      const dto = new RegisterRequest(req.body);
      const errors = dto.validate();

      if (errors.length > 0) {
        return res.status(400).json(ApiResponse.error('Dữ liệu không hợp lệ', errors));
      }

      const user = await authService.register(dto);
      return res.status(201).json(ApiResponse.success('Đăng ký thành công', user));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error.message));
    }
  },

  async login(req, res) {
    try {
      const dto = new LoginRequest(req.body);
      const errors = dto.validate();

      if (errors.length > 0) {
        return res.status(400).json(ApiResponse.error('Dữ liệu không hợp lệ', errors));
      }

      const result = await authService.login(dto);
      return res.status(200).json(ApiResponse.success('Đăng nhập thành công', result));
    } catch (error) {
      return res.status(401).json(ApiResponse.error(error.message));
    }
  },

  async getProfile(req, res) {
    try {
      const user = await authService.getProfile(req.user.id);
      return res.status(200).json(ApiResponse.success('Lấy thông tin thành công', user));
    } catch (error) {
      return res.status(404).json(ApiResponse.error(error.message));
    }
  },

  async hello(req, res) {
    return res.status(200).json(ApiResponse.success('Hello, world!'));
  }
};

module.exports = authController;
