const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Person = require('./Person');

const SupportAgent = db.define('SupportAgent', {
  role: {
    type: DataTypes.BOOLEAN, // 1 Funcionario  // 0 Prestador de serviço
    allowNull: false,
    require: true,
  },
});

SupportAgent.belongsTo(Person);
Person.hasMany(SupportAgent);

module.exports = SupportAgent;
