//Institution, Departament, ReferenceType
const { getName } = require('../../middleware/helpers/getName');

module.exports.checkNameInput = async function (req, res, next) {
  const response = { name: req.body.name };
  const loggedInUser = await getName(req);

  const urlString = req.protocol + '://' + req.get('host') + req.originalUrl;
  const url = new URL(urlString);
  const pathSegments = url.pathname.split('/');
  const instance = pathSegments[1];

  if (response.name.length <= 1) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 2 caracteres.',
    );
    res.render(`${instance}/create`, { loggedInUser });

    return;
  }
  next();
};
