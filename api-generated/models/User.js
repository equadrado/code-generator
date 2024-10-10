
      const { Sequelize, DataTypes } = require('sequelize');
      const sequelize = require('../config/database');

      const User = sequelize.define('User', {
  "id": {
    "allowNull": true
  },
  "username": {
    "allowNull": true
  },
  "firstName": {
    "allowNull": true
  },
  "lastName": {
    "allowNull": true
  },
  "email": {
    "allowNull": true
  },
  "password": {
    "allowNull": true
  },
  "phone": {
    "allowNull": true
  },
  "userStatus": {
    "allowNull": true
  }
});

      module.exports = User;
    