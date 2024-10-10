
      const { Sequelize, DataTypes } = require('sequelize');
      const sequelize = require('../config/database');

      const Pet = sequelize.define('Pet', {
  "id": {
    "allowNull": true
  },
  "category": {
    "allowNull": true
  },
  "name": {
    "allowNull": true
  },
  "photoUrls": {
    "allowNull": true
  },
  "tags": {
    "allowNull": true
  },
  "status": {
    "allowNull": true
  }
});

      module.exports = Pet;
    