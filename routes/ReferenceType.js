const express = require('express');
const router = express.Router();
const ReferenceTypeController = require('../controller/ReferenceType');
const checkNameInput = require('../middleware/validations').checkNameInput;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

//get
router.get(
  '/cadastro',
  checkPrivilege,
  ReferenceTypeController.createReferenceType,
);
router.get('/', ReferenceTypeController.viewReferenceTypes);

//post
router.post(
  '/remove',
  checkPrivilege,
  ReferenceTypeController.removeReferenceType,
);

router.post(
  '/add',
  checkNameInput,
  ReferenceTypeController.createReferenceTypeSave,
);

module.exports = router;
