const express = require('express');
const router = express.Router();
const PersonController = require('../controller/Person');

router.get('/cadastro', PersonController.createPerson);
router.post('/add', PersonController.createPersonSave);
router.get('/', PersonController.viewPeople);

module.exports = router;
