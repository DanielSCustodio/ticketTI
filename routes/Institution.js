const express = require('express');
const router = express.Router();
const InstitutionController = require('../controller/Institution');
const checkNameInput = require('../middleware/validations').checkNameInput;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

//Get
router.get(
  '/cadastro',
  checkPrivilege,
  InstitutionController.createInstitution,
);

router.get('/', InstitutionController.viewInstitutions);

//Post
router.post(
  '/add',
  checkNameInput,
  InstitutionController.createInstitutionSave,
);
router.post('/remove', checkPrivilege, InstitutionController.removeInstitution);

module.exports = router;
