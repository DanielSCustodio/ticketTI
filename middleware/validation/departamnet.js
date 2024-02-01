const Person = require('../../models/Person');
const Equipment = require('../../models/Equipment');
const Ticket = require('../../models/Ticket');
const Departament = require('../../models/Departament');

module.exports.checkDeleteDepartament = async function async(req, res, next) {
  const DepartamentId = req.body.id;
  const departaments = await Departament.findAll({ raw: true });

  const departamentWithTicket = await Ticket.findOne({
    raw: true,
    where: { DepartamentId: DepartamentId },
  });

  const departamentWithEquipment = await Equipment.findOne({
    raw: true,
    where: { DepartamentId: DepartamentId },
  });

  const departamentWithPerson = await Person.findOne({
    raw: true,
    where: { DepartamentId: DepartamentId },
  });

  if (departamentWithTicket) {
    req.flash(
      'error-privilege',
      `Este setor não pode ser removido, pois está associado ao ticket ${departamentWithTicket.id}.`,
    );
    res.render('setor/all', { departaments });
    return;
  }

  if (departamentWithEquipment) {
    req.flash(
      'error-privilege',
      `Este setor não pode ser removido, pois está associado ao equipamento/sistema ${departamentWithEquipment.name}.`,
    );
    res.render('setor/all', { departaments });
    return;
  }

  if (departamentWithPerson) {
    req.flash(
      'error-privilege',
      `Este setor não pode ser removido, pois está associado a ${departamentWithPerson.name}.`,
    );
    res.render('setor/all', { departaments });
    return;
  }

  next();
};
