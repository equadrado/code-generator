
        const express = require('express');
        const router = express.Router();
        const { updatePetWithForm } = require('../controllers/updatePetWithForm');

        router.post('/pet/{petId}', updatePetWithForm);

        module.exports = router;
      