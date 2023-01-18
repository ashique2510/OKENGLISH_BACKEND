const express = require('express');
const router = express.Router();
const { paymentOrder, paymentVerify } = require('../payment/tutorPayment');

router.post('/orders', paymentOrder);
router.post('/verify', paymentVerify);

module.exports = router;
