
      const { Sequelize, DataTypes } = require('sequelize');
      const sequelize = require('../config/database')(Sequelize, DataTypes);

      const Tag = sequelize.define('Tag', {
  "id": {
    "allowNull": true
  },
  "name": {
    "allowNull": true
  }
});

      module.exports = Tag;
    