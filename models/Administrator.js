const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Person = require('./Person');

const Administrator = db.define('Administrator', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true,
  },

  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },

  privilege: {
    type: DataTypes.BOOLEAN, // 1 All - 0 Default
    allowNull: false,
    require: true,
  },
});

Administrator.belongsTo(Person);
Person.hasOne(Administrator);

module.exports = Administrator;
