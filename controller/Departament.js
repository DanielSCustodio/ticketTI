const Departament = require('../models/Departament');

module.exports = class DepartamentController {
  static createDepartament(_req, res) {
    res.render('setor/create');
  }
  static async createDepartamentSave(req, res) {
    const response = { name: req.body.departament };
    await Departament.create(response);
    res.redirect('/setor');
  }

  static async viewDepartaments(_req, res) {
    const departaments = await Departament.findAll({ raw: true });
    res.render('setor/all', { departaments });
  }
};
