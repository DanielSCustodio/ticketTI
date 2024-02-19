const Departament = require('../../models/Departament');
const Person = require('../../models/Person');
const Administrator = require('../../models/Administrator');
const Equipment = require('../../models/Equipment');
const Ticket = require('../../models/Ticket');
const { getName } = require('../../middleware/helpers/getName');
const { formatDateBd, formatDate } = require('../helpers/formatDate');

module.exports.checkTicket = async function async(req, res, next) {
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

  const loggedInUser = await getName(req);

  const dateNow = new Date();

  const hourNow = dateNow.toLocaleTimeString('pt-BR');

  const departaments = await Departament.findAll({ raw: true });
  const people = await Person.findAll({ raw: true });
  let administrators = await Administrator.findAll({
    include: [{ model: Person }],
  });
  const equipments = await Equipment.findAll({ raw: true });

  administrators = administrators.map((result) => result.get({ plain: true }));
  const ticket = {
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
  };

  if (title.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "assunto" deve conter pelo menos 10 caracteres.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!requesterInput) {
    req.flash(
      'error-input-ticket',
      'O campo "solicitante" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (description.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "descrição do problema" deve conter pelo menos 10 caracteres. ',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (solution.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "solução" deve conter pelo menos 10 caracteres. ',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!date) {
    req.flash(
      'error-input-ticket',
      'O campo "data do ticket" deve ser preenchido.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (formatDate(dateNow) < formatDateBd(date)) {
    req.flash(
      'error-input-ticket',
      'A data do ticket não pode ser posterior à data atual.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (endTime < startTime) {
    req.flash(
      'error-input-ticket',
      'A hora de início não pode ser posterior à hora de término.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (startTime > hourNow) {
    req.flash(
      'error-input-ticket',
      'O horário de início não pode ser posterior ao horário atual.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (endTime > hourNow) {
    req.flash(
      'error-input-ticket',
      'O horário de término não pode ser posterior ao horário atual.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!startTime) {
    req.flash(
      'error-input-ticket',
      'O campo "início do atendimento" deve ser preenchido.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!startTime) {
    req.flash(
      'error-input-ticket',
      'O campo "início do atendimento" deve ser preenchido.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!endTime) {
    req.flash(
      'error-input-ticket',
      'O campo "final do atendimento" deve ser preenchido.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!administratorInput) {
    req.flash(
      'error-input-ticket',
      'O campo "agente de atendimento" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!departamentInput) {
    req.flash(
      'error-input-ticket',
      'O campo "setor" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }

  if (!equipmentInput) {
    req.flash(
      'error-input-ticket',
      'O campo "Equipamento/Sistema" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      loggedInUser,
    });
    return;
  }
  next();
};

module.exports.checkUpdateTicket = async function async(req, res, next) {
  const id = req.body.id;
  const loggedInUser = await getName(req);

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

  const ticket = await Ticket.findOne({
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

  const departaments = await Departament.findAll({ raw: true });
  const people = await Person.findAll({ raw: true });
  let administrators = await Administrator.findAll({
    include: [{ model: Person }],
  });
  const equipments = await Equipment.findAll({ raw: true });

  administrators = administrators.map((result) => result.get({ plain: true }));

  if (title.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "assunto" deve conter pelo menos 10 caracteres. ',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!requesterInput) {
    req.flash(
      'error-input-ticket',
      'O campo "solicitante" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (description.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "descrição do problema" deve conter pelo menos 10 caracteres. ',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (solution.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "solução" deve conter pelo menos 10 caracteres. ',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!date) {
    req.flash(
      'error-input-ticket',
      'O campo "data do ticket" deve ser preenchido.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!startTime) {
    req.flash(
      'error-input-ticket',
      'O campo "início do atendimento" deve ser preenchido.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!startTime) {
    req.flash(
      'error-input-ticket',
      'O campo "início do atendimento" deve ser preenchido.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!endTime) {
    req.flash(
      'error-input-ticket',
      'O campo "final do atendimento" deve ser preenchido.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!administratorInput) {
    req.flash(
      'error-input-ticket',
      'O campo "agente de atendimento" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!departamentInput) {
    req.flash(
      'error-input-ticket',
      'O campo "setor" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  if (!equipmentInput) {
    req.flash(
      'error-input-ticket',
      'O campo "Equipamento/Sistema" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/edit', {
      ticket,
      departaments,
      people,
      equipments,
      administrators,
      supportAgent,
      departament,
      requester,
      equipment,
      loggedInUser,
    });
    return;
  }

  next();
};

module.exports.checkSearchTicket = async function async(req, res, next) {
  const { search } = req.body;
  const loggedInUser = await getName(req);

  const tickets = await Ticket.findAll({ raw: true });

  if (search.length <= 2) {
    req.flash(
      'error-search',
      'O termo de busca deve conter pelo menos 3 caracteres.',
    );
    return res.render('ticket/all', { tickets, loggedInUser });
  }
  next();
};
