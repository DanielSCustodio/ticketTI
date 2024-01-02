const ReferenceType = require('../models/ReferenceType');

module.exports = class ReferenceTypeController {
  static createReferenceType(_req, res) {
    res.render('tipo-de-referencia/create');
  }
  static async createReferenceTypeSave(req, res) {
    const response = { name: req.body.name };
    await ReferenceType.create(response);
    res.redirect('/tipo-de-referencia');
  }

  static async viewReferenceTypes(_req, res) {
    const referenceTypes = await ReferenceType.findAll({ raw: true });
    console.log('=======>', referenceTypes);
    res.render('tipo-de-referencia/all', { referenceTypes });
  }
};
