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

// @desc    Show edit page
// @route   GET /dashboard/edit/:id
router.get('/edit/:id', isLogged.ensureAuth, dashboardController.getDashboardEdit);

// @desc    Process edit
// @route   POST(PUT) /dashboard/edit/:id
router.put('/edit/:id', isLogged.ensureAuth, dashboardController.putDashboardEdit);

// @desc    Delete todo
// @route   POST(DELETE) /dashboard/:id
router.delete('/:id', isLogged.ensureAuth, dashboardController.deleteDashboard);

module.exports = router;