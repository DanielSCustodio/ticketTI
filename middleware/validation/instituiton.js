//Institution
const Person = require('../../models/Person');
const Institution = require('../../models/Institution');

module.exports.checkDeleteInstitution = async function async(req, res, next) {
  const institutionId = req.body.id;
  const institutions = await Institution.findAll({ raw: true });

  const personWithInstitution = await Person.findOne({
    raw: true,
    where: { InstitutionId: institutionId },
  });

  if (personWithInstitution) {
    req.flash(
      'error-privilege',
      `Esta instituição não pode ser removida, pois está associada a ${personWithInstitution.name}.`,
    );
    res.render('instituicao/all', { institutions });
    return;
  }
  next();
};

module.exports.checkUpdateInstitution = async function async(req, res, next) {
  const id = req.body.id;
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
    res.render('instituicao/edit', { institution });
    return;
  }
  next();
};
