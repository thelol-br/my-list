exports.getDashboard = (req, res, next) => {
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        mainPage: true,

    });
}