const express = require('express');
const router = express.Router();
const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');
const changePass = require('../controllers/auth/changePass');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/register', register);
router.post('/changePass', authMiddleware, changePass);

module.exports = router;