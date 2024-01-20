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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const person = await Person.findOne({
        raw: true,
        where: { name: personSelected },
      });

      const adm = {
        username,
        password: hashedPassword,
        confirmpassword,
        privilege,
        PersonId: person.id,
      };
      await Administrator.create(adm);
      req.flash(
        'create-administrator',
        `Administrador "${username}" criado com sucesso.`,
      );
      res.redirect('/administrador');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async viewAdministrators(req, res) {
    const id = req.session.userid;

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      let administrators = await Administrator.findAll({
        include: [{ model: Person }],
      });
      administrators = administrators.map((result) =>
        result.get({ plain: true }),
      );
      res.render('administrador/all', { administrators, privilege });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removeAdministrator(req, res) {
    const id = req.body.id;
    try {
      const administrator = await Administrator.findOne({
        where: { id: id },
        raw: true,
      });
      await Administrator.destroy({ where: { id: id } });
      req.flash(
        'delete-administrator',
        `Administrador "${administrator.username}" excluído com sucesso.`,
      );
      req.session.save(() => {
        res.redirect('/administrador');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
