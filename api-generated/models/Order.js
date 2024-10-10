
      const { Sequelize, DataTypes } = require('sequelize');
      const sequelize = require('../config/database');

      const Order = sequelize.define('Order', {
  "id": {
    "allowNull": true
  },
  "petId": {
    "allowNull": true
  },
  "quantity": {
    "allowNull": true
  },
  "shipDate": {
    "allowNull": true
  },
  "status": {
    "allowNull": true
  },
  "complete": {
    "allowNull": true
  }
});

      module.exports = Order;
    