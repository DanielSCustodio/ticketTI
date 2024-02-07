const express = require('express');
const router = express.Router();
const AdministratorController = require('../controller/Administrator');
const checkAdministrator =
  require('../middleware/validation/administrator').checkAdministrator;
const {
  checkPrivilege,
  checkAllPrivilege,
  checkDeleteAdministator,
  redirectAdministrator,
  checkUpdateAdministrator,
} = require('../middleware/validation/administrator');

//get
router.get(
  '/cadastro',
  checkAllPrivilege,
  checkPrivilege,
  AdministratorController.createAdministrator,
);

router.get(
  '/editar/:id',
  redirectAdministrator,
  AdministratorController.updateAdministrator,
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
router.post(
  '/edit',
  checkUpdateAdministrator,
  AdministratorController.updateAdministratorSave,
);
module.exports = router;
