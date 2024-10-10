
      const { Sequelize, DataTypes } = require('sequelize');
      const sequelize = require('../config/database')(Sequelize, DataTypes);

      const ApiResponse = sequelize.define('ApiResponse', {
  "code": {
    "allowNull": true
  },
  "type": {
    "allowNull": true
  },
  "message": {
    "allowNull": true
  }
});

      module.exports = ApiResponse;
    