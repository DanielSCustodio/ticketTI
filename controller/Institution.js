const Institution = require('../models/Institution');
const Administrator = require('../models/Administrator');

module.exports = class InstitutionController {
  static createInstitution(_req, res) {
    res.render('instituicao/create');
  }
  static async createInstitutionSave(req, res) {
    const response = { name: req.body.name };
    try {
      req.flash(
        'create-institution',
        `Instituição "${response.name}" criada com sucesso.`,
      );
      await Institution.create(response);
      res.redirect('/instituicao');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async viewInstitutions(req, res) {
    const id = req.session.userid;

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      const institutions = await Institution.findAll({ raw: true });
      req.session.save(() => {
        res.render('instituicao/all', { institutions, privilege });
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removeInstitution(req, res) {
    const id = req.body.id;
    try {
      const institution = await Institution.findOne({
        where: { id: id },
        raw: true,
      });
      await Institution.destroy({ where: { id: id } });
      req.flash(
        'delete-institution',
        `Instituição "${institution.name}" excluída com sucesso.`,
      );
      req.session.save(() => {
        res.redirect('/instituicao');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updateInstituiton(req, res) {
    const id = req.params.id;
    const institution = await Institution.findOne({
      where: { id: id },
      raw: true,
    });
    res.render('instituicao/edit', { institution });
  }

  static async updateInstituitonSave(req, res) {
    const id = req.body.id;
    const institution = {
      name: req.body.name,
    };
    try {
      req.flash(
        'update-institution',
        `Instituição "${institution.name}" atualizada com sucesso.`,
      );
      await Institution.update(institution, { where: { id: id } });
      res.redirect('/instituicao');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
