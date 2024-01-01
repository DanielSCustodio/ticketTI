const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Departament = require('./Departament');
const Person = require('./Person');
const ReferenceType = require('./ReferenceType');

const Equipment = db.define('Equipment', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },
  reference: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },
});

Equipment.belongsTo(ReferenceType);
ReferenceType.hasMany(Equipment);

Equipment.belongsTo(Departament);
Departament.hasMany(Equipment);

Equipment.belongsTo(Person, {
  foreignKey: 'PersonId',
  allowNull: true,
});
Person.hasMany(Equipment);

module.exports = Equipment;
