const express = require('express');
const router = express.Router();
const EquipmentController = require('../controller/Equipment');
const checkEquipment = require('../middleware/validations').checkEquipment;

router.get('/cadastro', EquipmentController.createEquipment);
router.post('/add', checkEquipment, EquipmentController.createEquipmentSave);
router.get('/', EquipmentController.viewEquipments);

module.exports = router;
