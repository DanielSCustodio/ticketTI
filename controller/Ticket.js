const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Administrator = require('../models/Administrator');
const Equipment = require('../models/Equipment');
const Ticket = require('../models/Ticket');
const { getName } = require('../middleware/helpers/getName');
const { formatDateBd } = require('../middleware/helpers/formatDate');
const { Op } = require('sequelize');

module.exports = class TicketController {
  static async createTicket(req, res) {
    const loggedInUser = await getName(req);

    try {
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
        loggedInUser,
        departaments,
        people,
        equipments,
        administrators,
      });
    } catch (error) {
      console.log(
        'Aconteceu um erro no controller createTicket ticket ===>',
        error,
      );
    }
  }

  static async createTicketSave(req, res) {
    const {
      title,
      description,
      solution,
      date,
      startTime,
      endTime,
      administratorInput,
      departamentInput,
      requesterInput,
      equipmentInput,
    } = req.body;

    /*  const id = (await Ticket.findAll({ raw: true })).length + 1; */

    try {
      const person = await Person.findOne({
        raw: true,
        where: { name: administratorInput },
      });

      const supportAgent = await Administrator.findOne({
        raw: true,
        where: { PersonId: person.id },
      });

      const departament = await Departament.findOne({
        raw: true,
        where: { name: departamentInput },
      });

      const requester = await Person.findOne({
        raw: true,
        where: { name: requesterInput },
      });

      const equipment = await Equipment.findOne({
        raw: true,
        where: { name: equipmentInput },
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
      console.log(
        'Aconteceu um erro no controller createTicketSave ticket ===>',
        error,
      );
    }
  }

  static async viewTickets(req, res) {
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

      tickets = tickets.reverse();

      res.render('ticket/all', { tickets, privilege, loggedInUser });
    } catch (error) {
      console.log(
        'Aconteceu um erro no controller viewTickets ticket ===>',
        error,
      );
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

  static async updateTicket(req, res) {
    const id = req.params.id;
    const loggedInUser = await getName(req);

    try {
      const ticket = await Ticket.findOne({
        where: { id: id },
        raw: true,
      });

      const departaments = await Departament.findAll({ raw: true });

      const people = await Person.findAll({ raw: true });

      let administrators = await Administrator.findAll({
        include: [{ model: Person }],
      });

      const equipments = await Equipment.findAll({ raw: true });

      administrators = administrators.map((result) =>
        result.get({ plain: true }),
      );

      const person = await Administrator.findOne({
        raw: true,
        where: { id: ticket.AdministratorId },
      });

      const supportAgent = await Person.findOne({
        raw: true,
        where: { id: person.PersonId },
      });

      const departament = await Departament.findOne({
        raw: true,
        where: { id: ticket.DepartamentId },
      });

      const requester = await Person.findOne({
        raw: true,
        where: { id: ticket.PersonId },
      });

      const equipment = await Equipment.findOne({
        raw: true,
        where: { id: ticket.EquipmentId },
      });

      res.render('ticket/edit', {
        loggedInUser,
        ticket,
        departaments,
        people,
        equipments,
        administrators,
        supportAgent,
        departament,
        requester,
        equipment,
      });
    } catch (error) {
      console.log(
        'Aconteceu um erro no controller updateTicket ticket ===>',
        error,
      );
    }
  }

  static async updateTicketSave(req, res) {
    const id = req.body.id;

    const {
      title,
      description,
      solution,
      date,
      startTime,
      endTime,
      administratorInput,
      requesterInput,
      departamentInput,
      equipmentInput,
    } = req.body;

    try {
      const administrator = await Person.findOne({
        raw: true,
        where: { name: administratorInput },
      });

      const agent = await Administrator.findOne({
        raw: true,
        where: { PersonId: administrator.id },
      });

      const requester = await Person.findOne({
        raw: true,
        where: { name: requesterInput },
      });

      const departament = await Departament.findOne({
        raw: true,
        where: { name: departamentInput },
      });

      const equipment = await Equipment.findOne({
        raw: true,
        where: { name: equipmentInput },
      });

      const ticket = {
        title,
        description,
        solution,
        date,
        startTime,
        endTime,
        AdministratorId: agent.id,
        PersonId: requester.id,
        DepartamentId: departament.id,
        EquipmentId: equipment.id,
      };

      req.flash(
        'update-ticket',
        `Item "${ticket.title}" atualizado com sucesso.`,
      );
      await Ticket.update(ticket, { where: { id: id } });
      res.redirect('/ticket');
    } catch (error) {
      console.log(
        'Aconteceu um erro no controller updateTicketSave ticket ===>',
        error,
      );
    }
  }

  static async detailsTicket(req, res) {
    const id = req.params.id;
    const loggedInUser = await getName(req);

    try {
      let ticket = await Ticket.findOne({
        where: { id: id },
        raw: true,
      });

      const person = await Administrator.findOne({
        raw: true,
        where: { id: ticket.AdministratorId },
      });

      const supportAgent = await Person.findOne({
        raw: true,
        where: { id: person.PersonId },
      });

      const departament = await Departament.findOne({
        raw: true,
        where: { id: ticket.DepartamentId },
      });

      const requester = await Person.findOne({
        raw: true,
        where: { id: ticket.PersonId },
      });

      const equipment = await Equipment.findOne({
        raw: true,
        where: { id: ticket.EquipmentId },
      });

      const formattedDate = formatDateBd(ticket.date);

      res.render('ticket/detalhes', {
        formattedDate,
        loggedInUser,
        ticket,
        supportAgent,
        departament,
        requester,
        equipment,
      });
    } catch (error) {
      console.log(
        'Aconteceu um erro no controller updateTicket ticket ===>',
        error,
      );
    }
  }

  static async searchTicket(req, res) {
    const { search } = req.body;
    const clear = true;
    const loggedInUser = await getName(req);

    let tickets = await Ticket.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            solution: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
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

    res.render('ticket/all', { tickets, clear, loggedInUser });
  }
};
