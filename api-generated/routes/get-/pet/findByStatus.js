
        const express = require('express');
        const router = express.Router();
        const { findPetsByStatus } = require('../controllers/findPetsByStatus');

        router.get('/pet/findByStatus', findPetsByStatus);

        module.exports = router;
      