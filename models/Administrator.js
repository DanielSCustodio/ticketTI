const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Person = require('./Person');

const Administrador = db.define('Administrador', {
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
});

Administrador.belongsTo(Person);
Person.hasMany(Administrador);

module.exports = Administrador;
