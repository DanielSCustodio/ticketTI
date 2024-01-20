const express = require('express');
const router = express.Router();
const AdministratorController = require('../controller/Administrator');
const checkAdministrator =
  require('../middleware/validations').checkAdministrator;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

//get
router.get(
  '/cadastro',
  checkPrivilege,
  AdministratorController.createAdministrator,
);

router.get('/', AdministratorController.viewAdministrators);

//post
router.post(
  '/remove',
  checkPrivilege,
  AdministratorController.removeAdministrator,
);
router.post(
  '/add',
  checkAdministrator,
  AdministratorController.createAdministratorSave,
);

module.exports = router;
