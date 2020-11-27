const passport = require('passport');


exports.getAuthGoogle = passport.authenticate('google', { scope: ['profile'] });
exports.getAuthGoogleCallback = passport.authenticate('google', { failureRedirect: '/' });
exports.getAuthGoogleCallbackRedirect = (req, res, next) => { res.redirect('/dashboard') }

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/')
}

exports.isLogged = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/')
        } else {
            return next()
        }
    }
}