//Institution
const Person = require('../../models/Person');

module.exports.checkDeleteInstitution = async function async(req, res, next) {
  const institutionId = req.body.id;

  const personWithInstitution = await Person.findOne({
    raw: true,
    where: { InstitutionId: institutionId },
  });

  if (personWithInstitution) {
    req.flash(
      'error-privilege',
      `Esta instituição não pode ser removida, pois está associada a ${personWithInstitution.name}.`,
    );
    res.redirect('/instituicao');
    return;
  }
  next();
};
