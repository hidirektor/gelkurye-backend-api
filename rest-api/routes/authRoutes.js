const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const logoutController = require('../controllers/auth/logoutController');
const resetPasswordController = require('../controllers/auth/resetPasswordController');
const sendOtpController = require('../controllers/auth/sendOtpController');
const getProfileInfoController = require('../controllers/profile/getProfileInfoController');
const updateProfileController = require('../controllers/profile/updateProfileController');

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/logout', authMiddleware(), logoutController.logout);
router.post('/resetPass', resetPasswordController.resetPassword);
router.post('/refresh-token', refreshTokenController.refreshToken);
router.post('/sendOTP', sendOtpController.sendOtp);
router.get('/getProfileInfo/:userName', authMiddleware(), getProfileInfoController.getProfileInfo);
router.put('/updateProfile/:userName', authMiddleware(), updateProfileController.updateProfile);

module.exports = router;
