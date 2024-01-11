const express = require('express');
const router = express.Router();
const DepartamentController = require('../controller/Departament');
const checkNameInput = require('../middleware/validations').checkNameInput;

router.get('/cadastro', DepartamentController.createDepartament);
router.post(
  '/add',
  checkNameInput,
  DepartamentController.createDepartamentSave,
);
router.get('/', DepartamentController.viewDepartaments);

module.exports = router;
