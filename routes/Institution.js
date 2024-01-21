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
router.get(
  '/editar/:id',
  checkPrivilege,
  InstitutionController.updateInstituiton,
);
router.get('/', InstitutionController.viewInstitutions);

//Post
router.post(
  '/add',
  checkPrivilege,
  checkNameInput,
  InstitutionController.createInstitutionSave,
);
router.post('/remove', checkPrivilege, InstitutionController.removeInstitution);
router.post(
  '/edit',
  checkPrivilege,
  InstitutionController.updateInstituitonSave,
);

module.exports = router;
