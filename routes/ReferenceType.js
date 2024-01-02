const express = require('express');
const router = express.Router();
const ReferenceTypeController = require('../controller/ReferenceType');

router.get('/cadastro', ReferenceTypeController.createReferenceType);
router.post('/add', ReferenceTypeController.createReferenceTypeSave);
router.get('/', ReferenceTypeController.viewReferenceTypes);

module.exports = router;
