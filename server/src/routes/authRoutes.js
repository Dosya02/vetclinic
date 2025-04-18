const express = require('express');
const router = express.Router();
const { sendVerificationCode } = require('../controllers/authController');

router.post('/send-code', sendVerificationCode);

module.exports = router;
