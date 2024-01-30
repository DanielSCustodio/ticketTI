const Departament = require('../../models/Departament');
const Person = require('../../models/Person');
const Administrator = require('../../models/Administrator');
const Equipment = require('../../models/Equipment');

//Institution, Departament, ReferenceType
module.exports.checkNameInput = function (req, res, next) {
  const response = { name: req.body.name };
  const urlString = req.protocol + '://' + req.get('host') + req.originalUrl;
  const url = new URL(urlString);
  const pathSegments = url.pathname.split('/');
  const instance = pathSegments[1];

  if (response.name.length <= 1) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 2 caracteres.',
    );
    res.render(`${instance}/create`);

    return;
  }
  next();
};

