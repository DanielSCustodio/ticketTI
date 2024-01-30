const express = require('express');
const router = express.Router();
const DepartamentController = require('../controller/Departament');
const checkNameInput = require('../middleware/validation/validations').checkNameInput;
const checkPrivilege = require('../middleware/validation/administrator').checkPrivilege;

//get
router.get(
  '/cadastro',
  checkPrivilege,
  DepartamentController.createDepartament,
);
router.get(
  '/editar/:id',
  checkPrivilege,
  DepartamentController.updateDepartament,
);
router.get('/', DepartamentController.viewDepartaments);

//post
router.post('/remove', checkPrivilege, DepartamentController.removeDepartament);
router.post(
  '/add',
  checkNameInput,
  DepartamentController.createDepartamentSave,
);
router.post(
  '/edit',
  checkPrivilege,
  checkNameInput,
  DepartamentController.updateDepartamentSave,
);

module.exports = router;
