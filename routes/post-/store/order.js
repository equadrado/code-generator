
        const express = require('express');
        const router = express.Router();
        const { placeOrder } = require('../controllers/placeOrder');

        router.post('/store/order', placeOrder);

        module.exports = router;
      