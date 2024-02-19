const Person = require('../../models/Person');
const Equipment = require('../../models/Equipment');
const Ticket = require('../../models/Ticket');
const Departament = require('../../models/Departament');
const { getName } = require('../helpers/getName');

module.exports.checkDeleteDepartament = async function async(req, res, next) {
  const DepartamentId = req.body.id;
  const departaments = await Departament.findAll({ raw: true });
  const loggedInUser = await getName(req);

  const departamentWithTicket = await Ticket.findOne({
    raw: true,
    where: { DepartamentId: DepartamentId },
  });

  const departamentWithEquipment = await Equipment.findOne({
    raw: true,
    where: { DepartamentId: DepartamentId },
  });

  const departamentWithPerson = await Person.findOne({
    raw: true,
    where: { DepartamentId: DepartamentId },
  });

  if (departamentWithTicket) {
    res.set(
      'delete-message',
      `Este setor não pode ser removido, pois está associado ao ticket ${departamentWithTicket.id}.`,
    );
    res.render('setor/all', { departaments, loggedInUser });
    return;
  }

  if (departamentWithEquipment) {
    res.set(
      'delete-message',
      `Este setor não pode ser removido, pois está associado ao equipamento/sistema ${departamentWithEquipment.name}.`,
    );
    res.render('setor/all', { departaments, loggedInUser });
    return;
  }

  if (departamentWithPerson) {
    res.set(
      'delete-message',
      `Este setor não pode ser removido, pois está associado a ${departamentWithPerson.name}.`,
    );
    res.render('setor/all', { departaments, loggedInUser });
    return;
  }

  next();
};

module.exports.checkUpdateDepartament = async function async(req, res, next) {
  const id = req.body.id;
  const response = { name: req.body.name };
  const loggedInUser = await getName(req);

  const departament = await Departament.findOne({
    where: { id: id },
    raw: true,
  });

  if (response.name.length <= 1) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 2 caracteres.',
    );
    res.render('setor/edit', { departament, loggedInUser });
    return;
  }
  next();
};

module.exports.checkSearchDepartament = async function async(req, res, next) {
  const { search } = req.body;
  const departaments = await Departament.findAll({ raw: true });

  if (search.length <= 2) {
    req.flash(
      'error-search',
      'O termo de busca deve conter pelo menos 3 caracteres.',
    );
    return res.render('ticket/all', { departaments });
  }
  next();
};
