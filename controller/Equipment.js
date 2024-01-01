const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Equipment = require('../models/Equipment');

module.exports = class EquipmentController {
  static async createEquipment(_req, res) {
    const departaments = await Departament.findAll({ raw: true });
    const people = await Person.findAll({ raw: true });
    res.render('equipamento/create', { departaments, people });
  }

  static async createEquipmentSave(req, res) {
    const { name, personSelected, departamentSelected } = req.body;
    const id = (await Equipment.findAll({ raw: true })).length + 1;

    const departament = await Departament.findOne({
      raw: true,
      where: { name: departamentSelected },
    });

    const person = await Person.findOne({
      raw: true,
      where: { name: personSelected },
    });

    const equipment = {
      name,
      PersonId: person.id,
      DepartamentId: departament.id,
    };

    await Equipment.create(equipment);

    res.redirect(`/equipamento/${id}`);
  }

  static async viewEquipments(_req, res) {
    let equipments = await Equipment.findAll({
      include: [{ model: Departament }, { model: Person }],
    });
    equipments = equipments.map((result) => result.get({ plain: true }));
    res.render('equipamento/all', { equipments });
  }
};
