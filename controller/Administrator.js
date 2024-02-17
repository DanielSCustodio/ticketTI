const Person = require('../models/Person');
const Administrator = require('../models/Administrator');
const bcrypt = require('bcryptjs');
const { getName } = require('../middleware/helpers/getName');

module.exports = class AdministratorController {
  static async createAdministrator(req, res) {
    const loggedInUser = await getName(req);

    let people = await Person.findAll({ raw: true });
    const adm = await Administrator.findAll({ raw: true });
    const adminIds = adm.map((admin) => admin.PersonId);
    people = people.filter((person) => !adminIds.includes(person.id));
    res.render('administrador/create', { people, loggedInUser });
  }

  static async createAdministratorSave(req, res) {
    const {
      personSelected,
      username,
      password,
      confirmpassword,
      privilege,
      allPrivileges,
    } = req.body;
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
        allPrivileges,
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
    const loggedInUser = await getName(req);

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      let allPrivileges = user.allPrivileges;
      let administrators = await Administrator.findAll({
        include: [{ model: Person }],
      });
      administrators = administrators.map((result) =>
        result.get({ plain: true }),
      );
      res.render('administrador/all', {
        administrators,
        privilege,
        allPrivileges,
        loggedInUser,
      });
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
      res.set(
        'delete-message',
        `Administrador "${administrator.username}" excluído com sucesso.`,
      );
      res.status(200).send('Administrador excluído com sucesso.');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updateAdministrator(req, res) {
    const id = req.session.userid;
    const idEdit = req.params.id;

    const loggedInUser = await getName(req);

    try {
      const administrator = await Administrator.findOne({
        where: { id: id },
        raw: true,
      });

      const administratorEdit = await Administrator.findOne({
        where: { id: idEdit },
        raw: true,
      });

      const notAllPrivileges = administrator.allPrivileges === 0 ? true : false;

      res.render('administrador/edit', {
        loggedInUser,
        administratorEdit,
        notAllPrivileges,
      });
    } catch (error) {
      console.log(
        'Aconteceu um erro Controller updateAdministrator ===>',
        error,
      );
    }
  }

  static async updateAdministratorSave(req, res) {
    const id = req.body.id;

    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const admin = await Administrator.findOne({
      where: { id: id },
      raw: true,
    });

    const administrator = {
      username,
      password: hashedPassword,
      privilege: admin.privilege,
      allPrivileges: admin.allPrivileges,
      PersonId: admin.PersonId,
    };

    await Administrator.update(administrator, { where: { id: id } });

    req.flash('update-administrator', 'Credenciasis atualizadas com sucesso.');
    res.redirect(`/administrador/editar/${id}`);
  }
};
