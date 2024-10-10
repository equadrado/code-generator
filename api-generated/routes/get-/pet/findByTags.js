
        const express = require('express');
        const router = express.Router();
        const { findPetsByTags } = require('../controllers/findPetsByTags');

        router.get('/pet/findByTags', findPetsByTags);

        module.exports = router;
      