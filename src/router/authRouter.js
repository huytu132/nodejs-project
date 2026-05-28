const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { authenticate } = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/profile  (protected)
router.get('/profile', authenticate, authController.getProfile);

// GET /api/auth/hello (public)
router.get('/hello', authController.hello);

module.exports = router;

//http://localhost:3000/api/auth/hello