const express = require('express');
const router = express.Router();
const EquipmentController = require('../controller/Equipment');
const checkEquipment = require('../middleware/validations').checkEquipment;
const checkPrivilege = require('../middleware/validations').checkPrivilege;

router.get('/cadastro', checkPrivilege, EquipmentController.createEquipment);
router.post('/add', checkEquipment, EquipmentController.createEquipmentSave);
router.get('/', EquipmentController.viewEquipments);

module.exports = router;
