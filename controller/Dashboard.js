const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Administrator = require('../models/Administrator');
const Equipment = require('../models/Equipment');
const Ticket = require('../models/Ticket');

module.exports = class DashboardController {
  static async viewDashboard(_req, res) {
    let tickets = await Ticket.findAll({
      include: [
        { model: Departament },
        { model: Person },
        {
          model: Administrator,
          include: [{ model: Person, attributes: ['name'] }],
        },
        { model: Equipment },
      ],
    });

    console.log('=========>', tickets);

    const ticketsDuration = tickets.map((ticket) => {
      const startTimeString = ticket.startTime;
      const endTimeString = ticket.endTime;

      const startTime = new Date(`1970-01-01T${startTimeString}`);
      const endTime = new Date(`1970-01-01T${endTimeString}`);

      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        return {
          ...ticket.get(),
          duration: 'Erro: startTime ou endTime inválidos',
        };
      }

      const diffMilliseconds = endTime - startTime;
      const diffInSeconds = diffMilliseconds / 1000 / 60; // Converta para segundos

      return {
        ...ticket.get(),
        duration: diffInSeconds,
      };
    });

    tickets = tickets.map((result) => {
      const plainResult = result.get({ plain: true });
      plainResult.AdministratorName = plainResult.Administrator?.Person?.name;
      return plainResult;
    });

    res.render('dashboard/all', { ticketsDuration });
  }
};
