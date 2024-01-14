const express = require('express');
const router = express.Router();
const ReferenceTypeController = require('../controller/ReferenceType');
const checkNameInput = require('../middleware/validations').checkNameInput;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

router.get(
  '/cadastro',
  checkPrivilege,
  ReferenceTypeController.createReferenceType,
);
router.post(
  '/add',
  checkNameInput,
  ReferenceTypeController.createReferenceTypeSave,
);
router.get('/', ReferenceTypeController.viewReferenceTypes);

module.exports = router;
