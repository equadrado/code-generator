
        const express = require('express');
        const router = express.Router();
        const { deleteOrder } = require('../controllers/deleteOrder');

        router.delete('/store/order/{orderId}', deleteOrder);

        module.exports = router;
      