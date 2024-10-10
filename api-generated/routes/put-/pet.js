
        const express = require('express');
        const router = express.Router();
        const { updatePet } = require('../controllers/updatePet');

        router.put('/pet', updatePet);

        module.exports = router;
      