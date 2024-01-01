const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Departament = require('./Departament');
const Person = require('./Person');

const Equipment = db.define('Equipment', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },
});

Equipment.belongsTo(Departament);
Departament.hasMany(Equipment);

Equipment.belongsTo(Person, {
  foreignKey: 'PersonId',
  allowNull: true,
});
Person.hasMany(Equipment);

module.exports = Equipment;
