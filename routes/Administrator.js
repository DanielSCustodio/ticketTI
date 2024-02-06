const express = require('express');
const router = express.Router();
const AdministratorController = require('../controller/Administrator');
const checkAdministrator =
  require('../middleware/validation/administrator').checkAdministrator;
const {
  checkPrivilege,
  checkAllPrivilege,
  checkDeleteAdministator,
} = require('../middleware/validation/administrator');

//get
router.get(
  '/cadastro',
  checkAllPrivilege,
  checkPrivilege,
  AdministratorController.createAdministrator,
);

router.get('/', checkAllPrivilege, AdministratorController.viewAdministrators);

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
