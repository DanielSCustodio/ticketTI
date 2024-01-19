const Departament = require('../models/Departament');
const Institution = require('../models/Institution');
const Person = require('../models/Person');
const ReferenceType = require('../models/ReferenceType');
const Administrator = require('../models/Administrator');
const Equipment = require('../models/Equipment');

//Institution, Departament, ReferenceType
module.exports.checkNameInput = function (req, res, next) {
  const response = { name: req.body.name };
  const urlString = req.protocol + '://' + req.get('host') + req.originalUrl;
  const url = new URL(urlString);
  const pathSegments = url.pathname.split('/');
  const instance = pathSegments[1];

  if (response.name.length <= 2) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 3 caracteres.',
    );
    res.render(`${instance}/create`);

    return;
  }
  next();
};

//Person
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

//Equipment
module.exports.checkEquipment = async function async(req, res, next) {
  const {
    name,
    personSelected,
    reference,
    referenceTypeSelected,
    departamentSelected,
  } = req.body;

  const departaments = await Departament.findAll({ raw: true });
  const people = await Person.findAll({ raw: true });
  const referenceType = await ReferenceType.findAll({ raw: true });

  if (name.length <= 3) {
    req.flash(
      'error-input-equipment',
      'O campo "equipamento" deve conter pelo menos 4 caracteres. ',
    );
    res.render('equipamento/create', { departaments, people, referenceType });
    return;
  }

  if (!personSelected) {
    req.flash(
      'error-input-equipment',
      'O campo "colaborador" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/create', { departaments, people, referenceType });
    return;
  }

  if (!departamentSelected) {
    req.flash(
      'error-input-equipment',
      'O campo "setor" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/create', { departaments, people, referenceType });
    return;
  }

  if (!referenceTypeSelected) {
    req.flash(
      'error-input-equipment',
      'O campo "tipo de referência" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/create', { departaments, people, referenceType });
    return;
  }

  if (reference.length <= 3) {
    req.flash(
      'error-input-equipment',
      'O campo "referência" deve conter pelo menos 4 caracteres. ',
    );
    res.render('equipamento/create', { departaments, people, referenceType });
    return;
  }

  next();
};

//Administrator
module.exports.checkAdministrator = async function async(req, res, next) {
  const { personSelected, username, password, confirmpassword } = req.body;

  let people = await Person.findAll({ raw: true });
  const adm = await Administrator.findAll({ raw: true });

  const adminIds = adm.map((admin) => admin.PersonId);
  people = people.filter((person) => !adminIds.includes(person.id));

  const checkIfUserExists = await Administrator.findOne({
    where: { username: username },
  });

  if (!personSelected) {
    req.flash(
      'error-input-administrator',
      'O campo "colaborador" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('administrador/create', { people });
    return;
  }

  if (checkIfUserExists) {
    req.flash('error-input-administrator', 'Nome de usuário já cadastrado');
    const people = await Person.findAll({ raw: true });
    res.render('administrador/create', { people });
    return;
  }

  if (password.length <= 5) {
    req.flash(
      'error-input-administrator',
      'O campo "senha" deve conter pelo menos 6 caracteres. ',
    );
    res.render('administrador/create', { people });
    return;
  }

  if (password !== confirmpassword) {
    req.flash('error-input-administrator', 'Senhas não conferem!');
    const people = await Person.findAll({ raw: true });
    res.render('administrador/create', { people });
    return;
  }

  next();
};

//Administrator Privilege
module.exports.checkPrivilege = async function async(req, res, next) {
  const id = req.session.userid;
  const user = await Administrator.findOne({
    where: { id: id },
  });

  if (!user.privilege) {
    req.flash(
      'error-privilege',
      'Você não possui privilégios de administrador.',
    );
    res.redirect('/dashboard');
    return;
  }
  next();
};
//Ticket
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
