const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Equipment = require('../models/Equipment');
const ReferenceType = require('../models/ReferenceType');
const Administrator = require('../models/Administrator');

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
    /*  const id = (await Equipment.findAll({ raw: true })).length + 1; */

    try {
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
      req.flash('create-equipment', ` Item "${name}" criado com sucesso.`);
      await Equipment.create(equipment);

      res.redirect('/equipamento');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async viewEquipments(req, res) {
    const id = req.session.userid;

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      let equipments = await Equipment.findAll({
        include: [
          { model: Departament },
          { model: Person },
          { model: ReferenceType },
        ],
      });
      equipments = equipments.map((result) => result.get({ plain: true }));
      res.render('equipamento/all', { equipments, privilege });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removeEquipment(req, res) {
    const id = req.body.id;
    try {
      const equipment = await Equipment.findOne({
        where: { id: id },
        raw: true,
      });
      await Equipment.destroy({ where: { id: id } });
      req.flash(
        'delete-equipment',
        `Item "${equipment.name}" excluído com sucesso.`,
      );
      req.session.save(() => {
        res.redirect('/equipamento');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
