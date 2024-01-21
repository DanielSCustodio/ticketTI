const Departament = require('../models/Departament');
const Institution = require('../models/Institution');
const Person = require('../models/Person');
const Administrator = require('../models/Administrator');

module.exports = class PersonController {
  static async createPerson(_req, res) {
    const departaments = await Departament.findAll({ raw: true });
    const institutions = await Institution.findAll({ raw: true });
    res.render('colaborador/create', { departaments, institutions });
  }

  static async createPersonSave(req, res) {
    const { name, role, institutionSelected, departamentSelected } = req.body;
    /*     const id = (await Person.findAll({ raw: true })).length + 1; */

    try {
      const departament = await Departament.findOne({
        raw: true,
        where: { name: departamentSelected },
      });
      const institution = await Institution.findOne({
        raw: true,
        where: { name: institutionSelected },
      });
      const person = {
        name,
        role,
        InstitutionId: institution.id,
        DepartamentId: departament.id,
      };
      req.flash(
        'create-person',
        `Colaborador "${name}" cadastrado com sucesso.`,
      );
      await Person.create(person);
      res.redirect(`/colaborador`);
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async viewPeople(req, res) {
    const id = req.session.userid;

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;

      let people = await Person.findAll({
        include: [{ model: Departament }, { model: Institution }],
      });
      people = people.map((result) => result.get({ plain: true }));
      res.render('colaborador/all', { people, privilege });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removePerson(req, res) {
    const id = req.body.id;
    try {
      const person = await Person.findOne({
        where: { id: id },
        raw: true,
      });
      await Person.destroy({ where: { id: id } });
      req.flash(
        'delete-person',
        `Colaborador "${person.name}" excluído com sucesso.`,
      );
      req.session.save(() => {
        res.redirect('/colaborador');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updatePerson(req, res) {
    const id = req.params.id;

    try {
      const person = await Person.findOne({
        where: { id: id },
        raw: true,
      });

      const departaments = await Departament.findAll({ raw: true });
      const institutions = await Institution.findAll({ raw: true });

      const institutionSelected = await Institution.findOne({
        raw: true,
        where: { id: person.InstitutionId },
      });

      const departamentSelected = await Departament.findOne({
        raw: true,
        where: { id: person.DepartamentId },
      });

      res.render('colaborador/edit', {
        person,
        departaments,
        institutions,
        institutionSelected,
        departamentSelected,
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updatePersonSave(req, res) {
    const id = req.body.id;
    const { name, role, institutionSelected, departamentSelected } = req.body;

    try {
      const departament = await Departament.findOne({
        raw: true,
        where: { name: departamentSelected },
      });

      const institution = await Institution.findOne({
        raw: true,
        where: { name: institutionSelected },
      });

      const person = {
        name,
        role,
        InstitutionId: institution.id,
        DepartamentId: departament.id,
      };
      req.flash(
        'update-person',
        `Registro de "${person.name}" atualizado com sucesso.`,
      );
      await Person.update(person, { where: { id: id } });
      res.redirect('/colaborador');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
