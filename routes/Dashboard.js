const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/Dashboard');

router.get('/', DashboardController.viewDashboard);

module.exports = router;
