const Departament = require('../../models/Departament');
const Person = require('../../models/Person');
const Administrator = require('../../models/Administrator');
const Equipment = require('../../models/Equipment');

module.exports.checkTicket = async function async(req, res, next) {
  const {
    title,
    description,
    solution,
    date,
    startTime,
    endTime,
    administratorIdSelected,
    requesterSelected,
    departamentSelected,
    equipmentSelected,
  } = req.body;

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
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }


  if (!requesterSelected) {
    req.flash(
      'error-input-ticket',
      'O campo "solicitante" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (description.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "descrição do problema" deve conter pelo menos 10 caracteres. ',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (solution.length <= 9) {
    req.flash(
      'error-input-ticket',
      'O campo "solução" deve conter pelo menos 10 caracteres. ',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (!date) {
    req.flash(
      'error-input-ticket',
      'O campo "data do ticket" deve ser preenchido.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (!startTime) {
    req.flash(
      'error-input-ticket',
      'O campo "início do atendimento" deve ser preenchido.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (!startTime) {
    req.flash(
      'error-input-ticket',
      'O campo "início do atendimento" deve ser preenchido.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (!endTime) {
    req.flash(
      'error-input-ticket',
      'O campo "final do atendimento" deve ser preenchido.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (!administratorIdSelected) {
    req.flash(
      'error-input-ticket',
      'O campo "agente de atendimento" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (!departamentSelected) {
    req.flash(
      'error-input-ticket',
      'O campo "setor" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }

  if (!equipmentSelected) {
    req.flash(
      'error-input-ticket',
      'O campo "Equipamento/Sistema" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('ticket/create', {
      departaments,
      people,
      equipments,
      administrators,
    });
    return;
  }
  next();
};
