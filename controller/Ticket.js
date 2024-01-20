const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Administrator = require('../models/Administrator');
const Equipment = require('../models/Equipment');
const Ticket = require('../models/Ticket');

module.exports = class TicketController {
  static async createTicket(_req, res) {
    const departaments = await Departament.findAll({ raw: true });
    const people = await Person.findAll({ raw: true });
    let administrators = await Administrator.findAll({
      include: [{ model: Person }],
    });
    const equipments = await Equipment.findAll({ raw: true });

    administrators = administrators.map((result) =>
      result.get({ plain: true }),
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
  }

  static async createTicketSave(req, res) {
    const {
      title,
      description,
      solution,
      date,
      startTime,
      endTime,
      administratorIdSelected,
      departamentSelected,
      requesterSelected,
      equipmentSelected,
    } = req.body;

    /*  const id = (await Ticket.findAll({ raw: true })).length + 1; */

    try {
      const supportAgent = await Person.findOne({
        raw: true,
        where: { name: administratorIdSelected },
      });

      const departament = await Departament.findOne({
        raw: true,
        where: { name: departamentSelected },
      });

      const requester = await Person.findOne({
        raw: true,
        where: { name: requesterSelected },
      });

      const equipment = await Equipment.findOne({
        raw: true,
        where: { name: equipmentSelected },
      });

      const ticket = {
        title,
        description,
        solution,
        date,
        startTime,
        endTime,
        AdministratorId: supportAgent.id,
        DepartamentId: departament.id,
        PersonId: requester.id,
        EquipmentId: equipment.id,
      };
      req.flash('create-ticket', `Ticket "${title}" criado com sucesso.`);

      await Ticket.create(ticket);

      res.redirect('/ticket');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async viewTickets(req, res) {
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
      res.render('ticket/all', { tickets, privilege });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removeTicket(req, res) {
    const id = req.body.id;
    try {
      const ticket = await Ticket.findOne({
        where: { id: id },
        raw: true,
      });
      await Ticket.destroy({ where: { id: id } });
      req.flash(
        'delete-ticket',
        `Ticket "${ticket.title}" excluído com sucesso.`,
      );
      req.session.save(() => {
        res.redirect('/ticket');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
