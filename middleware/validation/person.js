//Person
const Institution = require('../../models/Institution');
const Departament = require('../../models/Departament');
const Person = require('../../models/Person');
const Administrator = require('../../models/Administrator');
const Ticket = require('../../models/Ticket');
const Equipment = require('../../models/Equipment');

module.exports.checkPerson = async function async(req, res, next) {
  const { name, role, institutionSelected, departamentSelected } = req.body;
  const departaments = await Departament.findAll({ raw: true });
  const institutions = await Institution.findAll({ raw: true });

  if (name.length <= 3) {
    req.flash(
      'error-input-person',
      'O campo "nome" deve conter pelo menos 4 caracteres. ',
    );
    res.render('colaborador/create', { departaments, institutions });
    return;
  }

  if (role.length <= 3) {
    req.flash(
      'error-input-person',
      'O campo "função" deve conter pelo menos 4 caracteres.',
    );
    res.render('colaborador/create', { departaments, institutions });
    return;
  }

  if (!institutionSelected) {
    req.flash(
      'error-input-person',
      'O campo "instituição" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('colaborador/create', { departaments, institutions });
    return;
  }

  if (!departamentSelected) {
    req.flash(
      'error-input-person',
      'O campo "setor" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('colaborador/create', { departaments, institutions });
    return;
  }
  next();
};

module.exports.checkDeletePerson = async function async(req, res, next) {
  const PersonId = req.body.id;

  let people = await Person.findAll({
    include: [{ model: Departament }, { model: Institution }],
  });
  people = people.map((result) => result.get({ plain: true }));

  const personWithAdministrator = await Administrator.findOne({
    raw: true,
    where: { PersonId: PersonId },
  });

  const personWithTicket = await Ticket.findOne({
    raw: true,
    where: { PersonId: PersonId },
  });

  const personWithEquipment = await Equipment.findOne({
    raw: true,
    where: { PersonId: PersonId },
  });
  
  if (personWithAdministrator) {
    req.flash(
      'error-privilege',
      'Esta pessoa não pode ser removida, pois é administradora.',
    );
    res.render('colaborador/all', { people });
    return;
  }

  if (personWithTicket) {
    req.flash(
      'error-privilege',
      `Esta pessoa não pode ser removida, pois está associada ao ticket ${personWithTicket.id} como solicitante.`,
    );
    res.render('colaborador/all', { people });
    return;
  }

  if (personWithEquipment) {
    req.flash(
      'error-privilege',
      `Esta pessoa não pode ser removida, pois está associada ao equipamento/sistema ${personWithEquipment.name}.`,
    );
    res.render('colaborador/all', { people });
    return;
  }

  next();
};
