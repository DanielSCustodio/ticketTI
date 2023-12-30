const Departament = require('../models/Departament');
const Institution = require('../models/Institution');
const Person = require('../models/Person');

module.exports = class PersonController {
  static async createPerson(_req, res) {
    const departaments = await Departament.findAll({ raw: true });
    const institutions = await Institution.findAll({ raw: true });
    res.render('colaborador/create', { departaments, institutions });
  }
  static async createPersonSave(req, res) {
    const { name, role, institutionSelected, departamentSelected } = req.body;
    const id = (await Person.findAll({ raw: true })).length + 1;

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

    await Person.create(person);

    res.redirect(`/colaborador/${id}`);
  }

  static async viewPeople(_req, res) {
    let people = await Person.findAll({
      include: [{ model: Departament }, { model: Institution }],
    });
    people = people.map((result) => result.get({ plain: true }));
    res.render('colaborador/all', { people });
  }
};
