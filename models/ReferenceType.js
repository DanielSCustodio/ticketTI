const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const ReferenceType = db.define('ReferenceType', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },
});

module.exports = ReferenceType;
