const express = require('express');
const router = express.Router();
const AdministratorController = require('../controller/Administrator');

router.get('/cadastro', AdministratorController.createAdministrator);
router.post('/add', AdministratorController.createAdministratorSave);
router.get('/', AdministratorController.viewAdministrators);

module.exports = router;
