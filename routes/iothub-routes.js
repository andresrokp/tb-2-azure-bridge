const express = require('express');
const router = express.Router();
const { sendMessageToIotHub } = require('../controllers/iothub-controller');

// Route to send message to Azure IoT Hub
router.post('/', sendMessageToIotHub);

module.exports = router;
