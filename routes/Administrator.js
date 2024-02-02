const express = require('express');
const router = express.Router();
const AdministratorController = require('../controller/Administrator');
const checkAdministrator =
  require('../middleware/validation/administrator').checkAdministrator;
const {checkPrivilege, checkDeleteAdministator} = require('../middleware/validation/administrator');

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
  checkDeleteAdministator,
  AdministratorController.removeAdministrator,
);
router.post(
  '/add',
  checkPrivilege,
  checkAdministrator,
  AdministratorController.createAdministratorSave,
);

module.exports = router;
