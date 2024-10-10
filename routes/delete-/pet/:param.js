
        const express = require('express');
        const router = express.Router();
        const { deletePet } = require('../controllers/deletePet');

        router.delete('/pet/{petId}', deletePet);

        module.exports = router;
      