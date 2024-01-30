//Person
const Institution = require('../../models/Institution');
const Departament = require('../../models/Departament');

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
