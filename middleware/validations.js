const Departament = require('../models/Departament');
const Institution = require('../models/Institution');

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

module.exports.checkPerson = async function async(req, res, next) {
  const { name, role, institutionSelected, departamentSelected } = req.body;
  const departaments = await Departament.findAll({ raw: true });
  const institutions = await Institution.findAll({ raw: true });

  if (name.length <= 3) {
    req.flash(
      'error-input-person',
      'O campo nome deve conter pelo menos 4 caracteres.',
    );
    res.render('colaborador/create', { departaments, institutions });
    return;
  }

  if (role.length <= 3) {
    req.flash(
      'error-input-person',
      'O campo função deve conter pelo menos 4 caracteres.',
    );
    res.render('colaborador/create', { departaments, institutions });
    return;
  }

  if (!institutionSelected) {
    req.flash('error-input-person', 'O campo instituição deve ser preenchido.');
    res.render('colaborador/create', { departaments, institutions });
    return;
  }

  if (!departamentSelected) {
    req.flash('error-input-person', 'O campo setor deve ser preenchido.');
    res.render('colaborador/create', { departaments, institutions });
    return;
  }
  next();
};
