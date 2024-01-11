const Institution = require('../models/Institution');

module.exports = class InstitutionController {
  static createInstitution(_req, res) {
    res.render('instituicao/create');
  }
  static async createInstitutionSave(req, res) {
    const name = { name: req.body.name };
    await Institution.create(name);
    res.redirect('/instituicao');
  }

  static async viewInstitutions(_req, res) {
    const institutions = await Institution.findAll({ raw: true });
    res.render('instituicao/all', { institutions });
  }
};
