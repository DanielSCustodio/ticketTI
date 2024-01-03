const express = require('express');
const router = express.Router();
const TicketController = require('../controller/Ticket');

router.get('/cadastro', TicketController.createTicket);
router.post('/add', TicketController.createTicketSave);
router.get('/', TicketController.viewTickets);

module.exports = router;
