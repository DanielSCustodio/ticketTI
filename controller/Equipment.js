const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Equipment = require('../models/Equipment');
const ReferenceType = require('../models/ReferenceType');

module.exports = class EquipmentController {
  static async createEquipment(_req, res) {
    const departaments = await Departament.findAll({ raw: true });
    const people = await Person.findAll({ raw: true });
    const referenceType = await ReferenceType.findAll({ raw: true });
    res.render('equipamento/create', { departaments, people, referenceType });
  }

  static async createEquipmentSave(req, res) {
    const {
      name,
      personSelected,
      reference,
      referenceTypeSelected,
      departamentSelected,
    } = req.body;
    const id = (await Equipment.findAll({ raw: true })).length + 1;

    const departament = await Departament.findOne({
      raw: true,
      where: { name: departamentSelected },
    });

    const person = await Person.findOne({
      raw: true,
      where: { name: personSelected },
    });

    const referenceType = await ReferenceType.findOne({
      raw: true,
      where: { name: referenceTypeSelected },
    });

    const equipment = {
      name,
      reference,
      ReferenceTypeId: referenceType.id,
      PersonId: person.id,
      DepartamentId: departament.id,
    };

    await Equipment.create(equipment);

    res.redirect(`/equipamento/${id}`);
  }

  static async viewEquipments(_req, res) {
    let equipments = await Equipment.findAll({
      include: [
        { model: Departament },
        { model: Person },
        { model: ReferenceType },
      ],
    });
    equipments = equipments.map((result) => result.get({ plain: true }));
    res.render('equipamento/all', { equipments });
  }
};
