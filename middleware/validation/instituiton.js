//Institution
const Person = require('../../models/Person');
const Administrator = require('../../models/Administrator');
const Institution = require('../../models/Institution');
const { getName } = require('../../middleware/helpers/getName');

module.exports.checkDeleteInstitution = async function async(req, res, next) {
  const institutionId = req.body.id;
  const loggedInUser = await getName(req);

  const institutions = await Institution.findAll({ raw: true });

  const personWithInstitution = await Person.findOne({
    raw: true,
    where: { InstitutionId: institutionId },
  });

  if (personWithInstitution) {
    res.set(
      'delete-message',
      `Esta instituição não pode ser removida, pois está associada a ${personWithInstitution.name}.`,
    );
    res.render('instituicao/all', { institutions, loggedInUser });
    return;
  }
  next();
};

module.exports.checkUpdateInstitution = async function async(req, res, next) {
  const id = req.body.id;
  const loggedInUser = await getName(req);

  const response = { name: req.body.name };

  const institution = await Institution.findOne({
    where: { id: id },
    raw: true,
  });

  if (response.name.length <= 1) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 2 caracteres.',
    );
    res.render('instituicao/edit', { institution, loggedInUser });
    return;
  }
  next();
};

module.exports.checkSearchInstituiton = async function async(req, res, next) {
  const { search } = req.body;
  const loggedInUser = await getName(req);
  const institutions = await Institution.findAll({ raw: true });
  const id = req.session.userid;
  const user = await Administrator.findOne({
    where: { id: id },
  });
  const privilege = user.privilege;

  if (search.length <= 2) {
    req.flash(
      'error-search',
      'O termo de busca deve conter pelo menos 3 caracteres.',
    );
    return res.render('instituicao/all', {
      institutions,
      loggedInUser,
      privilege,
    });
  }
  next();
};
