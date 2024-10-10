
        const express = require('express');
        const router = express.Router();
        const { addPet } = require('../controllers/addPet');

        router.post('/pet', addPet);

        module.exports = router;
      