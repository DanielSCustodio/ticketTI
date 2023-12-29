const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Institution = require('./Institution');
const Departament = require('./Departament');

const Person = db.define('Person', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },

  role: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },
});

Person.belongsTo(Institution);
Institution.hasMany(Person);

Person.belongsTo(Departament);
Departament.hasMany(Person);

module.exports = Person;
