const express = require('express');
const router = express.Router();
const InstitutionController = require('../controller/Institution');
const checkNameInput = require('../middleware/validations').checkNameInput;

router.get('/cadastro', InstitutionController.createInstitution);
router.post(
  '/add',
  checkNameInput,
  InstitutionController.createInstitutionSave,
);
router.get('/', InstitutionController.viewInstitutions);

module.exports = router;
