const Institution = require('../models/Institution');
const Administrator = require('../models/Administrator');
const { getName } = require('../middleware/helpers/getName');
const { Op } = require('sequelize');

module.exports = class InstitutionController {
  static async createInstitution(req, res) {
    const loggedInUser = await getName(req);
    res.render('instituicao/create', { loggedInUser });
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
    const loggedInUser = await getName(req);

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      const institutions = await Institution.findAll({ raw: true });
      req.session.save(() => {
        res.render('instituicao/all', {
          institutions,
          privilege,
          loggedInUser,
        });
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
      res.set(
        'delete-message',
        `Instituição "${institution.name}" excluída com sucesso.`,
      );
      res.status(200).send('Instituição excluída com sucesso.');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updateInstituiton(req, res) {
    const id = req.params.id;
    const loggedInUser = await getName(req);

    const institution = await Institution.findOne({
      where: { id: id },
      raw: true,
    });
    res.render('instituicao/edit', { institution, loggedInUser });
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

  static async searchInstituiton(req, res) {
    const { search } = req.body;
    const loggedInUser = await getName(req);

    const all = true;
    const institutions = await Institution.findAll({
      raw: true,
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.render('instituicao/all', { institutions, all, loggedInUser });
  }
};
