
      const { Sequelize, DataTypes } = require('sequelize');
      const sequelize = require('../config/database')(Sequelize, DataTypes);

      const Category = sequelize.define('Category', {
  "id": {
    "allowNull": true
  },
  "name": {
    "allowNull": true
  }
});

      module.exports = Category;
    