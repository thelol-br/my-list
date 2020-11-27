const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const { isLogged } = require('../controllers/auth');


// @desc    Login/Landing page
// @route   GET /
router.get('/', isLogged.ensureGuest, loginController.getLogin);

module.exports = router;