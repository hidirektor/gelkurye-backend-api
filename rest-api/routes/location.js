const express = require('express');
const router = express.Router();
const updateLocationController = require('../controllers/location/updateLocationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/updateLocation', authMiddleware, roleMiddleware(['Carrier']), updateLocationController.updateLocation);

module.exports = router;