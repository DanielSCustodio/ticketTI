const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Administrator = require('../models/Administrator');
const Equipment = require('../models/Equipment');
const Ticket = require('../models/Ticket');
const { getName } = require('../middleware/helpers/getName');
const { formatDateBd } = require('../middleware/helpers/formatDate');

module.exports = class DashboardController {
  static async viewDashboard(req, res) {
    const id = req.session.userid;
    const loggedInUser = await getName(req);

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

      // Formate a data antes de passá-la para o frontend
      tickets = tickets.map((result) => {
        const plainResult = result.get({ plain: true });
        // Renomeia o campo AdministratorId para AdministratorName
        plainResult.AdministratorName = plainResult.Administrator?.Person?.name;
        // Formate o campo de data para o formato brasileiro
        plainResult.date = formatDateBd(plainResult.date);
        return plainResult;
      });

      res.render('dashboard/all', { tickets, privilege, loggedInUser });
    } catch (error) {
      console.log(
        'Aconteceu um erro no controller viewTickets ticket ===>',
        error,
      );
    }
  }
};
