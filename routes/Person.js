const express = require('express');
const router = express.Router();
const PersonController = require('../controller/Person');
const checkPerson = require('../middleware/validations').checkPerson;

router.get('/cadastro', PersonController.createPerson);
router.post('/add', checkPerson, PersonController.createPersonSave);
router.get('/', PersonController.viewPeople);

module.exports = router;
