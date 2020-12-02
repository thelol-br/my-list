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
        res.render('add', {
            pageTitle: 'Add to do'
        })
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

// edit page
exports.getDashboardEdit = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id }).lean();
        if (!todo) {
            res.redirect('/dashboard');
        }

        if (todo.user != req.user.id) {
            res.redirect('/dashboard');
        } else {
            if (todo.status === 'to do') {
                res.render('edit', {
                    todo,
                    pageTitle: 'Edit to do',
                    todos: true,
                })
            } else if (todo.status === 'doing') {
                res.render('edit', {
                    todo,
                    pageTitle: 'Edit to do',
                    doing: true,
                })
            } else if (todo.status === 'done') {
                res.render('edit', {
                    todo,
                    pageTitle: 'Edit to do',
                    done: true,
                })
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// process the edit page
exports.putDashboardEdit = async (req, res, next) => {
    try {
        let todo = await Todo.findById(req.params.id).lean();
        if (!todo) {
            res.redirect('/dashboard')
        }
        if (todo.user != req.user.id) {
            res.redirect('/dashboard');
        } else {
            todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
    }
}

// delete todo
exports.deleteDashboard = async (req, res, next) => {
    try {
        await Todo.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err);
    }
}