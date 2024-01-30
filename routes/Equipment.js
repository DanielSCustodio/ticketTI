const express = require('express');
const router = express.Router();
const EquipmentController = require('../controller/Equipment');
const checkEquipment = require('../middleware/validation/equipment').checkEquipment;
const checkPrivilege = require('../middleware/validation/administrator').checkPrivilege;

//get
router.get('/cadastro', checkPrivilege, EquipmentController.createEquipment);

router.get('/editar/:id', checkPrivilege, EquipmentController.updateEquipment);

router.get('/', EquipmentController.viewEquipments);

//post
router.post('/remove', checkPrivilege, EquipmentController.removeEquipment);

router.post('/add', checkEquipment, EquipmentController.createEquipmentSave);

router.post(
  '/edit',
  checkPrivilege,
  checkEquipment, EquipmentController.updateEquipmentSave,
);

module.exports = router;
