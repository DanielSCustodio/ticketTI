const express = require('express');
const router = express.Router();
const AdministratorController = require('../controller/Administrator');
const checkAdministrator =
  require('../middleware/validations').checkAdministrator;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

router.get(
  '/cadastro',
  checkPrivilege,
  AdministratorController.createAdministrator,
);
router.post(
  '/add',
  checkAdministrator,
  AdministratorController.createAdministratorSave,
);
router.get('/', AdministratorController.viewAdministrators);

module.exports = router;
