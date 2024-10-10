
        const express = require('express');
        const router = express.Router();
        const { uploadFile } = require('../controllers/uploadFile');

        router.post('/pet/{petId}/uploadImage', uploadFile);

        module.exports = router;
      