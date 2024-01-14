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

    tickets = tickets.map((result) => {
      const plainResult = result.get({ plain: true });
      plainResult.AdministratorName = plainResult.Administrator?.Person?.name;
      return plainResult;
    });
    res.render('dashboard/all', { tickets });
  }
};
