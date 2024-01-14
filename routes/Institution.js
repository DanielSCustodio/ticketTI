const express = require('express');
const router = express.Router();
const InstitutionController = require('../controller/Institution');
const checkNameInput = require('../middleware/validations').checkNameInput;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

router.get(
  '/cadastro',
  checkPrivilege,
  InstitutionController.createInstitution,
);
router.post(
  '/add',
  checkNameInput,
  InstitutionController.createInstitutionSave,
);
router.get('/', InstitutionController.viewInstitutions);

module.exports = router;
