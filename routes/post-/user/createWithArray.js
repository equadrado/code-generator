
        const express = require('express');
        const router = express.Router();
        const { createUsersWithArrayInput } = require('../controllers/createUsersWithArrayInput');

        router.post('/user/createWithArray', createUsersWithArrayInput);

        module.exports = router;
      