//Institution
const Equipment = require('../../models/Equipment');
const ReferenceType = require('../../models/ReferenceType');

module.exports.checkDeleteReferenceType = async function async(req, res, next) {

  const ReferenceTypeId = req.body.id;
  const referenceTypes = await ReferenceType.findAll({ raw: true });
  const referenceTypeWithEquipment = await Equipment.findOne({
    raw: true,
    where: { ReferenceTypeId: ReferenceTypeId },
  });

  if (referenceTypeWithEquipment) {
    req.flash(
      'error-privilege',
      `Este tipo de referência não pode ser removido, pois está associado ao equipamento ${referenceTypeWithEquipment.name}.`,
    );
    res.render('tipo-de-referencia/all', { referenceTypes });
    return;
  }
  next();
};

module.exports.checkUpdateReferenceType = async function async(req, res, next) {
  const id = req.body.id;
  const response = { name: req.body.name };

  const referenceType = await ReferenceType.findOne({
    where: { id: id },
    raw: true,
  });

  if (response.name.length <= 1) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 2 caracteres.',
    );
    res.render('tipo-de-referencia/edit', { referenceType });
    return;
  }
  next();
};

