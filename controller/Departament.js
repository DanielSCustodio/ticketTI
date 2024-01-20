const Departament = require('../models/Departament');
const Administrator = require('../models/Administrator');

module.exports = class DepartamentController {
  static createDepartament(_req, res) {
    res.render('setor/create');
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

    const user = await Administrator.findOne({
      where: { id: id },
    });
    let privilege = user.privilege;
    console.log('--->', privilege);

    try {
      const departaments = await Departament.findAll({ raw: true });
      req.session.save(() => {
        res.render('setor/all', { departaments, privilege });
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
      req.flash(
        'delete-departament',
        `Setor "${departament.name}" excluído com sucesso.`,
      );
      req.session.save(() => {
        res.redirect('/setor');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
