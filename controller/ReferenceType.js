const ReferenceType = require('../models/ReferenceType');
const Administrator = require('../models/Administrator');
const { getName } = require('../middleware/helpers/getName');

module.exports = class ReferenceTypeController {
  static async createReferenceType(req, res) {
    const loggedInUser = await getName(req);
    res.render('tipo-de-referencia/create', { loggedInUser });
  }
  static async createReferenceTypeSave(req, res) {
    const response = { name: req.body.name };

    try {
      req.flash(
        'create-reference-type',
        `Tipo de referência "${response.name}" criada com sucesso.`,
      );
      await ReferenceType.create(response);
      res.redirect('/tipo-de-referencia');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async viewReferenceTypes(req, res) {
    const id = req.session.userid;
    const loggedInUser = await getName(req);

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      const referenceTypes = await ReferenceType.findAll({ raw: true });
      req.session.save(() => {
        res.render('tipo-de-referencia/all', {
          referenceTypes,
          privilege,
          loggedInUser,
        });
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async removeReferenceType(req, res) {
    const id = req.body.id;
    try {
      const referenceType = await ReferenceType.findOne({
        where: { id: id },
        raw: true,
      });
      await ReferenceType.destroy({ where: { id: id } });
      req.flash(
        'delete-reference-type',
        `Tipo de referência "${referenceType.name}" excluída com sucesso.`,
      );
      req.session.save(() => {
        res.redirect('/tipo-de-referencia');
      });
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }

  static async updateReferenceType(req, res) {
    const id = req.params.id;
    const loggedInUser = await getName(req);
    const referenceType = await ReferenceType.findOne({
      where: { id: id },
      raw: true,
    });
    res.render('tipo-de-referencia/edit', { referenceType, loggedInUser });
  }

  static async updateReferenceTypeSave(req, res) {
    const id = req.body.id;
    const referenceType = {
      name: req.body.name,
    };
    try {
      req.flash(
        'update-reference-type',
        `Tipo de referência "${referenceType.name}" atualizada com sucesso.`,
      );
      await ReferenceType.update(referenceType, { where: { id: id } });
      res.redirect('/tipo-de-referencia');
    } catch (error) {
      console.log('Aconteceu um erro ===>', error);
    }
  }
};
