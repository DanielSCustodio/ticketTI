const Departament = require('../models/Departament');
const Person = require('../models/Person');
const Equipment = require('../models/Equipment');
const ReferenceType = require('../models/ReferenceType');
const Administrator = require('../models/Administrator');
const { getName } = require('../middleware/helpers/getName');
const { Op } = require('sequelize');

module.exports = class EquipmentController {
  static async createEquipment(req, res) {
    const loggedInUser = await getName(req);

    const departaments = await Departament.findAll({ raw: true });
    const people = await Person.findAll({ raw: true });
    const referenceType = await ReferenceType.findAll({ raw: true });

    res.render('equipamento/create', {
      departaments,
      people,
      referenceType,
      loggedInUser,
    });
  }

  static async createEquipmentSave(req, res) {
    const { name, personInput, reference, referenceInput, departamentInput } =
      req.body;
    /*  const id = (await Equipment.findAll({ raw: true })).length + 1; */

    try {
      const departament = await Departament.findOne({
        raw: true,
        where: { name: departamentInput },
      });

      const person = await Person.findOne({
        raw: true,
        where: { name: personInput },
      });

      const referenceType = await ReferenceType.findOne({
        raw: true,
        where: { name: referenceInput },
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
    const loggedInUser = await getName(req);

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
      res.render('equipamento/all', { equipments, privilege, loggedInUser });
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
      res.set(
        'delete-message',
        `Item "${equipment.name}" excluído com sucesso.`,
      );
      res.status(200).send('Equipamento/Sistema excluído com sucesso.');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updateEquipment(req, res) {
    const id = req.params.id;
    const loggedInUser = await getName(req);

    try {
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

      res.render('equipamento/edit', {
        loggedInUser,
        equipment,
        people,
        departaments,
        referenceType,
        personSelected,
        referenceTypeSelected,
        departamentSelected,
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updateEquipmentSave(req, res) {
    const id = req.body.id;

    const { name, personInput, reference, referenceInput, departamentInput } =
      req.body;

    try {
      const departament = await Departament.findOne({
        raw: true,
        where: { name: departamentInput },
      });

      const person = await Person.findOne({
        raw: true,
        where: { name: personInput },
      });

      const referenceType = await ReferenceType.findOne({
        raw: true,
        where: { name: referenceInput },
      });

      const equipment = {
        name,
        reference,
        ReferenceTypeId: referenceType.id,
        PersonId: person.id,
        DepartamentId: departament.id,
      };

      req.flash(
        'update-equipment',
        `Item "${equipment.name}" atualizado com sucesso.`,
      );
      await Equipment.update(equipment, { where: { id: id } });
      res.redirect('/equipamento');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async searchEquipment(req, res) {
    const { search } = req.body;

    const all = true;

    const loggedInUser = await getName(req);

    let equipments = await Equipment.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            reference: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      include: [
        { model: Departament },
        { model: Person },
        { model: ReferenceType },
      ],
    });
    equipments = equipments.map((result) => result.get({ plain: true }));
    res.render('equipamento/all', { equipments, all, loggedInUser });
  }
};
