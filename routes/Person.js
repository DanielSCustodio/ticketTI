const express = require('express');
const router = express.Router();
const PersonController = require('../controller/Person');
const {
  checkPerson,
  checkDeletePerson,
  checkUpdatePerson,
  checkSearchPerson,
} = require('../middleware/validation/person');
const checkPrivilege =
  require('../middleware/validation/administrator').checkPrivilege;

//get
router.get('/cadastro', checkPrivilege, PersonController.createPerson);

router.get('/editar/:id', checkPrivilege, PersonController.updatePerson);

router.get('/', PersonController.viewPeople);

//post

router.post('/add', checkPerson, PersonController.createPersonSave);

router.post(
  '/remove',
  checkPrivilege,
  checkDeletePerson,
  PersonController.removePerson,
);

router.post(
  '/edit',
  checkPrivilege,
  checkUpdatePerson,
  PersonController.updatePersonSave,
);

router.post('/', checkSearchPerson, PersonController.searchPerson);

module.exports = router;
