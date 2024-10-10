
        const express = require('express');
        const router = express.Router();
        const { logoutUser } = require('../controllers/logoutUser');

        router.get('/user/logout', logoutUser);

        module.exports = router;
      