const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Administrator = require('../models/Administrator');
const Equipment = require('../models/Equipment');
const Ticket = require('../models/Ticket');

module.exports = class DashboardController {
  static async viewDashboard(req, res) {
    const id = req.session.userid;

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;

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
        // Renomeia o campo AdministratorId para AdministratorName
        plainResult.AdministratorName = plainResult.Administrator?.Person?.name;
        return plainResult;
      });
      res.render('dashboard/all', { tickets, privilege });
    } catch (error) {
      console.log(
        'Aconteceu um erro no controller viewTickets ticket ===>',
        error,
      );
    }
  }
};
