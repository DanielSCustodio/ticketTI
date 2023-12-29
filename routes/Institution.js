const express = require('express');
const router = express.Router();
const InstitutionController = require('../controller/Institution');

router.get('/cadastro', InstitutionController.createInstitution);
router.post('/add', InstitutionController.createInstitutionSave);
router.get('/', InstitutionController.viewInstitutions);

module.exports = router;
