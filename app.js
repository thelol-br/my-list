const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// Connect DB
connectDB();

const app = express();

// Load Morgan logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Load handlebars and use .hbs extension instead
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

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
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);