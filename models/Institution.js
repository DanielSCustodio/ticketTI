const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Institution = db.define('Institution', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },
});

module.exports = Institution;
