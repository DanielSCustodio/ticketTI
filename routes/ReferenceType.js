const express = require('express');
const router = express.Router();
const ReferenceTypeController = require('../controller/ReferenceType');
const checkNameInput = require('../middleware/validations').checkNameInput;

router.get('/cadastro', ReferenceTypeController.createReferenceType);
router.post(
  '/add',
  checkNameInput,
  ReferenceTypeController.createReferenceTypeSave,
);
router.get('/', ReferenceTypeController.viewReferenceTypes);

module.exports = router;
