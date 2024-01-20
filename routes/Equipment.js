const express = require('express');
const router = express.Router();
const EquipmentController = require('../controller/Equipment');
const checkEquipment = require('../middleware/validations').checkEquipment;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

//get
router.get('/cadastro', checkPrivilege, EquipmentController.createEquipment);
router.get('/', EquipmentController.viewEquipments);

//post
router.post('/remove', checkPrivilege, EquipmentController.removeEquipment);
router.post('/add', checkEquipment, EquipmentController.createEquipmentSave);

module.exports = router;
