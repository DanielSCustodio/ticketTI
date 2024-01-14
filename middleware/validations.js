const Departament = require('../models/Departament');
const Institution = require('../models/Institution');
const Person = require('../models/Person');
const ReferenceType = require('../models/ReferenceType');

//Institution, Departament, ReferenceType
module.exports.checkNameInput = function (req, res, next) {
  const response = { name: req.body.name };
  const urlString = req.protocol + '://' + req.get('host') + req.originalUrl;
  const url = new URL(urlString);
  const pathSegments = url.pathname.split('/');
  const instance = pathSegments[1];

  if (response.name.length <= 3) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 4 caracteres.',
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
