
        const express = require('express');
        const router = express.Router();
        const { createUser } = require('../controllers/createUser');

        router.post('/user', createUser);

        module.exports = router;
      