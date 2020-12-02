const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// Connect DB
connectDB();

// Init app as express instance
const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method Override
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}))

// Load Morgan logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Handlebars helpers
const { formatDate } = require('./helpers/hbs');

// Load handlebars and use .hbs extension instead
app.engine('.hbs', exphbs({ helpers: { formatDate }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const loginRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000
app.listen(
    PORT,
    console.log(`Server running in production on port ${PORT}`)
);