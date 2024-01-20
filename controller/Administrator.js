const Person = require('../models/Person');
const Administrator = require('../models/Administrator');
const bcrypt = require('bcryptjs');

module.exports = class AdministratorController {
  static async createAdministrator(_req, res) {
    let people = await Person.findAll({ raw: true });
    const adm = await Administrator.findAll({ raw: true });

    const adminIds = adm.map((admin) => admin.PersonId);
    people = people.filter((person) => !adminIds.includes(person.id));

    res.render('administrador/create', { people });
  }

  static async createAdministratorSave(req, res) {
    const { personSelected, username, password, confirmpassword, privilege } =
      req.body;

    const person = await Person.findOne({
      raw: true,
      where: { name: personSelected },
    });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const adm = {
      username,
      password: hashedPassword,
      confirmpassword,
      privilege,
      PersonId: person.id,
    };

    try {
      await Administrator.create(adm);
      req.flash('success-register', 'Usuário registrado com sucesso.');
      res.redirect('/administrador');
    } catch (error) {
      console.log(error);
    }
  }

  static async viewAdministrators(_req, res) {
    let administrators = await Administrator.findAll({
      include: [{ model: Person }],
    });
    administrators = administrators.map((result) =>
      result.get({ plain: true }),
    );
    res.render('administrador/all', { administrators });
  }


};
