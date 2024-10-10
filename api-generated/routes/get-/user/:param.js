
        const express = require('express');
        const router = express.Router();
        const { getUserByName } = require('../controllers/getUserByName');

        router.get('/user/{username}', getUserByName);

        module.exports = router;
      