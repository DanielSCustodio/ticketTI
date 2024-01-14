const express = require('express');
const router = express.Router();
const PersonController = require('../controller/Person');
const checkPerson = require('../middleware/validations').checkPerson;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

router.get('/cadastro', checkPrivilege, PersonController.createPerson);
router.post('/add', checkPerson, PersonController.createPersonSave);
router.get('/', PersonController.viewPeople);

module.exports = router;
