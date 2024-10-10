
        const express = require('express');
        const router = express.Router();
        const { updateUser } = require('../controllers/updateUser');

        router.put('/user/{username}', updateUser);

        module.exports = router;
      