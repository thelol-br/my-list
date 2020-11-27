const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// @desc    Auth with google
// @route   GET /auth/google
router.get('/google', authController.getAuthGoogle);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', authController.getAuthGoogleCallback, authController.getAuthGoogleCallbackRedirect);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', authController.getLogout);

module.exports = router;