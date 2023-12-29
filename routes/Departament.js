const express = require('express');
const router = express.Router();
const DepartamentController = require('../controller/Departament');

router.get('/cadastro', DepartamentController.createDepartament);
router.post('/add', DepartamentController.createDepartamentSave);
router.get('/', DepartamentController.viewDepartaments);

module.exports = router;
