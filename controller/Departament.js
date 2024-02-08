const Departament = require('../models/Departament');
const Administrator = require('../models/Administrator');
const { getName } = require('../middleware/helpers/getName');

module.exports = class DepartamentController {
  static async createDepartament(req, res) {
    const loggedInUser = await getName(req);

    res.render('setor/create', { loggedInUser });
  }

  static async createDepartamentSave(req, res) {
    const response = { name: req.body.name };

    try {
      req.flash(
        'create-departament',
        `Setor "${response.name}" criado com sucesso.`,
      );
      await Departament.create(response);
      res.redirect('/setor');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async viewDepartaments(req, res) {
    const id = req.session.userid;
    const loggedInUser = await getName(req);

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      const departaments = await Departament.findAll({ raw: true });
      req.session.save(() => {
        res.render('setor/all', { departaments, privilege, loggedInUser });
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removeDepartament(req, res) {
    const id = req.body.id;
    try {
      const departament = await Departament.findOne({
        where: { id: id },
        raw: true,
      });
      await Departament.destroy({ where: { id: id } });
      res.set(
        'delete-message',
        `Setor "${departament.name}" excluído com sucesso.`,
      );
      res.status(200).send('Instituição excluída com sucesso.');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updateDepartament(req, res) {
    const id = req.params.id;
    const loggedInUser = await getName(req);
    const departament = await Departament.findOne({
      where: { id: id },
      raw: true,
    });
    res.render('setor/edit', { departament, loggedInUser });
  }

  static async updateDepartamentSave(req, res) {
    const id = req.body.id;
    const departament = {
      name: req.body.name,
    };
    try {
      req.flash(
        'update-departament',
        `Setor "${departament.name}" atualizado com sucesso.`,
      );
      await Departament.update(departament, { where: { id: id } });
      res.redirect('/setor');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
