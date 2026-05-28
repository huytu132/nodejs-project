const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/userRepository');

const SALT_ROUNDS = 10;

const authService = {
  async register({ username, email, password }) {
    const emailExists = await userRepository.existsByEmail(email);
    if (emailExists) {
      throw new Error('Email đã được sử dụng');
    }

    const usernameExists = await userRepository.existsByUsername(username);
    if (usernameExists) {
      throw new Error('Username đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.create({ username, email, password: hashedPassword });

    return user;
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  },

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }
    return user;
  },
};

module.exports = authService;
