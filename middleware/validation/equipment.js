//Equipment
const Departament = require('../../models/Departament');
const Person = require('../../models/Person');
const ReferenceType = require('../../models/ReferenceType');
const Ticket = require('../../models/Ticket');
const Equipment = require('../../models/Equipment');

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

module.exports.checkDeleteEquipment = async function async(req, res, next) {
  const EquipmentId = req.body.id;

  let equipments = await Equipment.findAll({
    include: [
      { model: Departament },
      { model: Person },
      { model: ReferenceType },
    ],
  });

  equipments = equipments.map((result) => result.get({ plain: true }));

  const equipmentWithTicket = await Ticket.findOne({
    raw: true,
    where: { EquipmentId: EquipmentId },
  });

  if (equipmentWithTicket) {
    req.flash(
      'error-privilege',
      `Este equipamento/sistema não pode ser removido, pois está associada ao ticket ${equipmentWithTicket.id}.`,
    );
    res.render('equipamento/all', { equipments });
    return;
  }

  next();
};
