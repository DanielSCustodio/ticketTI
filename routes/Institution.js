const express = require('express');
const router = express.Router();
const InstitutionController = require('../controller/Institution');
const checkNameInput =
  require('../middleware/validation/validations').checkNameInput;
const checkPrivilege =
  require('../middleware/validation/administrator').checkPrivilege;
const {
  checkDeleteInstitution,
  checkUpdateInstitution,
} = require('../middleware/validation/instituiton');

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
  checkUpdateInstitution,
  InstitutionController.updateInstituitonSave,
);

module.exports = router;
