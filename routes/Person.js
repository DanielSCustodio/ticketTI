const express = require('express');
const router = express.Router();
const PersonController = require('../controller/Person');
const checkPerson = require('../middleware/validations').checkPerson;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

//get
router.get('/cadastro', checkPrivilege, PersonController.createPerson);

router.get('/editar/:id', checkPrivilege, PersonController.updatePerson);

router.get('/', PersonController.viewPeople);

//post

router.post('/add', checkPerson, PersonController.createPersonSave);

router.post('/remove', checkPrivilege, PersonController.removePerson);

router.post('/edit', checkPrivilege,checkPerson, PersonController.updatePersonSave);

module.exports = router;
