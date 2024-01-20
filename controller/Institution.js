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

  static async viewInstitutions(req, res) {
    try {
      const institutions = await Institution.findAll({ raw: true });
      req.session.save(() => {
        res.render('instituicao/all', { institutions });
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removeInstitution(req, res) {
    const id = req.body.id;
    try {
      await Institution.destroy({ where: { id: id } });
      req.flash('delete-Institution', 'instituição excluída com sucesso.');
      req.session.save(() => {
        res.redirect('/instituicao');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
