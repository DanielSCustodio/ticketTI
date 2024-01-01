const express = require('express');
const router = express.Router();
const EquipmentController = require('../controller/Equipment');

router.get('/cadastro', EquipmentController.createEquipment);
router.post('/add', EquipmentController.createEquipmentSave);
router.get('/', EquipmentController.viewEquipments);

module.exports = router;
