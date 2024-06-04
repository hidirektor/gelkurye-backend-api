const express = require('express');
const router = express.Router();
const sendMailOTP = require('../controllers/otp/sendMail');
const sendSMSOTP = require('../controllers/otp/sendSMS');
const verifyOTP = require('../controllers/otp/verifyOTP');
const userFetcher = require('../middleware/userFetch');

router.post('/sendMail', userFetcher, sendMailOTP);
router.post('/sendSMS', userFetcher, sendSMSOTP);
router.post('/verifyOTP', userFetcher, verifyOTP);

module.exports = router;
