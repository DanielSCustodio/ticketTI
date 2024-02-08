//Equipment
const Departament = require('../../models/Departament');
const Person = require('../../models/Person');
const ReferenceType = require('../../models/ReferenceType');
const Ticket = require('../../models/Ticket');
const Equipment = require('../../models/Equipment');
const { getName } = require('../../middleware/helpers/getName');

module.exports.checkEquipment = async function async(req, res, next) {
  const { name, personInput, reference, referenceInput, departamentInput } =
    req.body;
  const loggedInUser = await getName(req);

  const departaments = await Departament.findAll({ raw: true });
  const people = await Person.findAll({ raw: true });
  const referenceType = await ReferenceType.findAll({ raw: true });

  if (name.length <= 3) {
    req.flash(
      'error-input-equipment',
      'O campo "equipamento" deve conter pelo menos 4 caracteres.',
    );
    res.render('equipamento/create', {
      departaments,
      people,
      referenceType,
      loggedInUser,
    });
    return;
  }

  if (!personInput) {
    req.flash(
      'error-input-equipment',
      'O campo "colaborador" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/create', {
      departaments,
      people,
      referenceType,
      loggedInUser,
    });
    return;
  }

  if (!departamentInput) {
    req.flash(
      'error-input-equipment',
      'O campo "setor" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/create', {
      departaments,
      people,
      referenceType,
      loggedInUser,
    });
    return;
  }

  if (!referenceInput) {
    req.flash(
      'error-input-equipment',
      'O campo "tipo de referência" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/create', {
      departaments,
      people,
      referenceType,
      loggedInUser,
    });
    return;
  }

  if (reference.length <= 3) {
    req.flash(
      'error-input-equipment',
      'O campo "referência" deve conter pelo menos 4 caracteres. ',
    );
    res.render('equipamento/create', {
      departaments,
      people,
      referenceType,
      loggedInUser,
    });
    return;
  }

  next();
};

module.exports.checkDeleteEquipment = async function async(req, res, next) {
  const EquipmentId = req.body.id;
  const loggedInUser = await getName(req);

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
    res.set(
      'delete-message',
      `Este equipamento/sistema não pode ser removido, pois está associada ao ticket ${equipmentWithTicket.id}.`,
    );
    res.render('equipamento/all', { equipments, loggedInUser });
    return;
  }

  next();
};

module.exports.checkUpdateEquipment = async function async(req, res, next) {
  const id = req.body.id;
  const loggedInUser = await getName(req);

  const { name, reference, personInput, departamentInput, referenceInput } =
    req.body;

  const equipment = await Equipment.findOne({
    where: { id: id },
    raw: true,
  });

  const departaments = await Departament.findAll({ raw: true });
  const people = await Person.findAll({ raw: true });
  const referenceType = await ReferenceType.findAll({ raw: true });

  const personSelected = await Person.findOne({
    raw: true,
    where: { id: equipment.PersonId },
  });

  const departamentSelected = await Departament.findOne({
    raw: true,
    where: { id: equipment.DepartamentId },
  });

  const referenceTypeSelected = await ReferenceType.findOne({
    raw: true,
    where: { id: equipment.ReferenceTypeId },
  });

  if (name.length <= 3) {
    req.flash(
      'error-input-equipment',
      'O campo "equipamento" deve conter pelo menos 4 caracteres.',
    );

    res.render('equipamento/edit', {
      equipment,
      people,
      departaments,
      referenceType,
      personSelected,
      referenceTypeSelected,
      departamentSelected,
      loggedInUser,
    });
    return;
  }

  if (reference.length <= 3) {
    req.flash(
      'error-input-equipment',
      'O campo "referência" deve conter pelo menos 4 caracteres. ',
    );
    res.render('equipamento/edit', {
      equipment,
      people,
      departaments,
      referenceType,
      personSelected,
      referenceTypeSelected,
      departamentSelected,
      loggedInUser,
    });
    return;
  }

  if (!personInput) {
    req.flash(
      'error-input-equipment',
      'O campo "colaborador" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/edit', {
      equipment,
      people,
      departaments,
      referenceType,
      personSelected,
      referenceTypeSelected,
      departamentSelected,
      loggedInUser,
    });
    return;
  }

  if (!departamentInput) {
    req.flash(
      'error-input-equipment',
      'O campo "setor" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/edit', {
      equipment,
      people,
      departaments,
      referenceType,
      personSelected,
      referenceTypeSelected,
      departamentSelected,
      loggedInUser,
    });
    return;
  }

  if (!referenceInput) {
    req.flash(
      'error-input-equipment',
      'O campo "tipo de referência" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('equipamento/edit', {
      equipment,
      people,
      departaments,
      referenceType,
      personSelected,
      referenceTypeSelected,
      departamentSelected,
      loggedInUser,
    });
    return;
  }

  next();
};
