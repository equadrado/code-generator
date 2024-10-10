
        const express = require('express');
        const router = express.Router();
        const { getPetById } = require('../controllers/getPetById');

        router.get('/pet/{petId}', getPetById);

        module.exports = router;
      