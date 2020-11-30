const Todo = require('../models/Todo');


// render dashboard
exports.getDashboard = async (req, res, next) => {
    try {
        const todos = await Todo.find({ user: req.user.id, status: "to do" }).lean();
        const doing = await Todo.find({ user: req.user.id, status: "doing" }).lean();
        const done = await Todo.find({ user: req.user.id, status: "done" }).lean();
        res.render('dashboard', {
            pageTitle: 'Dashboard',
            mainPage: true,
            name: req.user.displayName,
            todos,
            doing,
            done
        });
    } catch (err) {
        console.error(err);
    }
}

// add page
exports.getDashboardAdd = async (req, res, next) => {
    try {
        res.render('add')
    } catch (err) {
        console.error(err);
    }
}

// process the add page
exports.postDashboardAdd = async (req, res, next) => {
    try {
        req.body.user = req.user.id
        await Todo.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
    }
}