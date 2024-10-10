
        const express = require('express');
        const router = express.Router();
        const { getInventory } = require('../controllers/getInventory');

        router.get('/store/inventory', getInventory);

        module.exports = router;
      