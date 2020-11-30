const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const { isLogged } = require('../controllers/auth');

// @desc    Dashboard
// @route   GET /dashboard
router.get('/', isLogged.ensureAuth, dashboardController.getDashboard);

// @desc    Show add page
// @route   GET /dashboard/add
router.get('/add', isLogged.ensureAuth, dashboardController.getDashboardAdd);

// @desc    Process add
// @route   POST /dashboard/add
router.post('/add', isLogged.ensureAuth, dashboardController.postDashboardAdd);

module.exports = router;