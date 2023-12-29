const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Person = require('./Person');

const SupportAgent = db.define('SupportAgent', {
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true,
  },
});

SupportAgent.belongsTo(Person);
Person.hasMany(SupportAgent);

module.exports = SupportAgent;
