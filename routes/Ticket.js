const express = require('express');
const router = express.Router();
const TicketController = require('../controller/Ticket');
const checkPrivilege =
  require('../middleware/validation/administrator').checkPrivilege;
const {
  checkTicket,
  checkUpdateTicket,
} = require('../middleware/validation/ticket');

//get
router.get('/cadastro', checkPrivilege, TicketController.createTicket);

router.get('/editar/:id', checkPrivilege, TicketController.updateTicket);

router.get('/detalhes/:id', checkPrivilege, TicketController.detailsTicket);

router.get('/', TicketController.viewTickets);

//post
router.post('/remove', checkPrivilege, TicketController.removeTicket);

router.post('/add', checkTicket, TicketController.createTicketSave);

router.post(
  '/edit',
  checkPrivilege,
  checkUpdateTicket,
  checkTicket,
  TicketController.updateTicketSave,
);

module.exports = router;
