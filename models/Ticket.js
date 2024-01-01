const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Departament = require('./Departament');
const Person = require('./Person');
const Administrador = require('./Administrator');
const Equipment = require('./Equipment');

const Ticket = db.define(
  'Ticket',
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      require: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      require: true,
    },

    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
      require: true,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      require: true,
    },

    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      require: true,
    },

    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      require: true,
    },
  },
  { timezone: '-03:00' },
);

Ticket.belongsTo(Departament);
Departament.hasMany(Ticket);

Ticket.belongsTo(Person, {
  foreignKey: 'PersonId',
  allowNull: true,
});
Person.hasMany(Ticket);

Ticket.belongsTo(Administrador);
Administrador.hasMany(Ticket);

Ticket.belongsTo(Administrador, {
  foreignKey: 'OneAssistantId',
  allowNull: true,
});

Ticket.belongsTo(Administrador, {
  foreignKey: 'TwoAssistantId',
  allowNull: true,
});

Ticket.belongsTo(Equipment);
Equipment.hasMany(Ticket);

module.exports = Ticket;
