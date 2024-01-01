const Person = require('../models/Person');
const Administrator = require('../models/Administrator');

module.exports = class AdministratorController {
  static async createAdministrator(_req, res) {
    const people = await Person.findAll({ raw: true });
    res.render('administrador/create', { people });
  }

  static async createAdministratorSave(req, res) {
    const { personSelected, username, password, privilege } = req.body;

    const person = await Person.findOne({
      raw: true,
      where: { name: personSelected },
    });

    const adm = {
      username,
      password,
      privilege,
      PersonId: person.id,
    };

    await Administrator.create(adm);

    res.redirect('/administrador');
  }

  static async viewAdministrators(_req, res) {
    let administradors = await Administrator.findAll({
      include: [{ model: Person }],
    });
    administradors = administradors.map((result) =>
      result.get({ plain: true }),
    );

    console.log(administradors);

    res.render('administrador/all', { administradors });
  }
};
