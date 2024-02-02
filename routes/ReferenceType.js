const express = require('express');
const router = express.Router();
const ReferenceTypeController = require('../controller/ReferenceType');
const checkNameInput =
  require('../middleware/validation/validations').checkNameInput;
const checkPrivilege =
  require('../middleware/validation/administrator').checkPrivilege;
const checkDeleteReferenceType =
  require('../middleware/validation/refrenceType').checkDeleteReferenceType;

//get
router.get(
  '/cadastro',
  checkPrivilege,
  ReferenceTypeController.createReferenceType,
);

router.get(
  '/editar/:id',
  checkPrivilege,
  ReferenceTypeController.updateReferenceType,
);

router.get('/', ReferenceTypeController.viewReferenceTypes);

//post
router.post(
  '/remove',
  checkPrivilege,
  checkDeleteReferenceType,
  ReferenceTypeController.removeReferenceType,
);

router.post(
  '/add',
  checkPrivilege,
  checkNameInput,
  ReferenceTypeController.createReferenceTypeSave,
);

router.post(
  '/edit',
  checkPrivilege,
  checkNameInput,
  ReferenceTypeController.updateReferenceTypeSave,
);

module.exports = router;
