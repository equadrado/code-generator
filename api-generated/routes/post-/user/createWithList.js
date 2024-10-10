
        const express = require('express');
        const router = express.Router();
        const { createUsersWithListInput } = require('../controllers/createUsersWithListInput');

        router.post('/user/createWithList', createUsersWithListInput);

        module.exports = router;
      