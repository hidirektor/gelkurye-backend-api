const express = require('express');
const router = express.Router();
const sendOTP = require('../controllers/otp/sendOTP');
const verifyOTP = require('../controllers/otp/verifyOTP');

router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

module.exports = router;
