const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Departament = require('./Departament');
const Person = require('./Person');
const SupportAgent = require('./SupportAgent');
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

Ticket.belongsTo(SupportAgent);
SupportAgent.hasMany(Ticket);

Ticket.belongsTo(SupportAgent, {
  foreignKey: 'OneSupportAgentId',
  allowNull: true,
});

Ticket.belongsTo(SupportAgent, {
  foreignKey: 'TwoSupportAgentId',
  allowNull: true,
});

Ticket.belongsTo(Equipment);
Equipment.hasMany(Ticket);

module.exports = Ticket;
