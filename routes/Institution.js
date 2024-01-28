const express = require('express');
const router = express.Router();
const InstitutionController = require('../controller/Institution');
const checkNameInput = require('../middleware/validations').checkNameInput;
const checkPrivilege = require('../middleware/validations').checkPrivilege;
const checkDeleteInstitution =
  require('../middleware/validations').checkDeleteInstitution;

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

router.post(
  '/remove',
  checkPrivilege,
  checkDeleteInstitution,
  InstitutionController.removeInstitution,
);

router.post(
  '/edit',
  checkPrivilege,
  checkNameInput,
  InstitutionController.updateInstituitonSave,
);

module.exports = router;
