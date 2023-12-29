const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Departament = db.define('Departament', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true,
  },
});

module.exports = Departament;
