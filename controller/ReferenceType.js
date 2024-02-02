const ReferenceType = require('../models/ReferenceType');
const Administrator = require('../models/Administrator');

module.exports = class ReferenceTypeController {
  static createReferenceType(_req, res) {
    res.render('tipo-de-referencia/create');
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

    try {
      const user = await Administrator.findOne({
        where: { id: id },
      });
      let privilege = user.privilege;
      const referenceTypes = await ReferenceType.findAll({ raw: true });
      req.session.save(() => {
        res.render('tipo-de-referencia/all', { referenceTypes, privilege });
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
    const referenceType = await ReferenceType.findOne({
      where: { id: id },
      raw: true,
    });
    res.render('tipo-de-referencia/edit', { referenceType });
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
