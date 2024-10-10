
        const express = require('express');
        const router = express.Router();
        const { loginUser } = require('../controllers/loginUser');

        router.get('/user/login', loginUser);

        module.exports = router;
      