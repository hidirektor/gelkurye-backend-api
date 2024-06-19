const express = require('express');
const router = express.Router();
const updateMerchantAPI = require('../controllers/merchant/updateMerchantAPI');
const getMerchantAPI = require('../controllers/merchant/getMerchantAPI');

router.post('/updateMarketplaceAPI', updateMerchantAPI);
router.post('/getMarketplaceAPI', getMerchantAPI);

module.exports = router;