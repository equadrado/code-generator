
        const express = require('express');
        const router = express.Router();
        const { getOrderById } = require('../controllers/getOrderById');

        router.get('/store/order/{orderId}', getOrderById);

        module.exports = router;
      