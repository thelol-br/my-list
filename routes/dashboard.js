const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const isLogged = require('../controllers/auth');

// @desc    Dashboard
// @route   GET /dashboard
router.get('/', isLogged.isLogged.ensureAuth, dashboardController.getDashboard);

module.exports = router;