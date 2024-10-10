
        const express = require('express');
        const router = express.Router();
        const { deleteUser } = require('../controllers/deleteUser');

        router.delete('/user/{username}', deleteUser);

        module.exports = router;
      