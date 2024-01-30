const express = require('express');
const router = express.Router();
const TicketController = require('../controller/Ticket');
const checkPrivilege = require('../middleware/validation/administrator').checkPrivilege;
const checkTicket = require('../middleware/validation/ticket').checkTicket;

//get
router.get('/cadastro', checkPrivilege, TicketController.createTicket);

router.get('/editar/:id', checkPrivilege, TicketController.updateTicket);

router.get('/', TicketController.viewTickets);

//post
router.post('/remove', checkPrivilege, TicketController.removeTicket);

router.post('/add', checkTicket, TicketController.createTicketSave);

router.post('/edit', checkPrivilege, checkTicket, TicketController.updateTicketSave);

module.exports = router;
