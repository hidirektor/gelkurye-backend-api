const express = require('express');
const router = express.Router();
const updateMerchantAPI = require('../controllers/merchant/updateMerchantAPI');
const getMerchantAPI = require('../controllers/merchant/getMerchantAPI');

router.post('/updateMerchantAPI', updateMerchantAPI);
router.post('/getMerchantAPI', getMerchantAPI);

module.exports = router;