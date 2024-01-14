const express = require('express');
const router = express.Router();
const TicketController = require('../controller/Ticket');
const checkPrivilege = require('../middleware/validations').checkPrivilege;

router.get('/cadastro', checkPrivilege, TicketController.createTicket);
router.post('/add', TicketController.createTicketSave);
router.get('/', TicketController.viewTickets);

module.exports = router;
