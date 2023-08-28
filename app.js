const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const { request } = require("express");
var cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override');
const path = require('path');
const flash = require('connect-flash');

//ROUTES
const company = require('./routes/company');
const room = require('./routes/room');
const meeting = require('./routes/meeting');
const user = require('./routes/user');
const role = require('./routes/role');

const secret = process.env.SECRET || 'bIlKPnuBwYddk45bzxrAQQweidhaludgalugaC1kLj7qy';

const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24, // milliseconds seconds minutes days weeks
        signed: true
    }
}

// EXPRESS
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES (for serving css, images, and JS files)
app.use(express.static(path.join(__dirname + '/css')))
app.use(express.static(path.join(__dirname + '/assets')))
app.use(express.static(path.join(__dirname + '/utils')))
// CALENDAR PATHS
app.use(express.static(path.join(__dirname + '/fullcalendar')))
app.use(express.static(path.join(__dirname + '/fonts')))
app.use(express.static(path.join(__dirname + '/js')))
app.use(express.static(path.join(__dirname + '/scss')))

app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(session(sessionConfig))

// Executed every time the app receives a request
app.use((req, res, next) => {
    res.locals.token = req.session.token;
    res.locals.currentUser = req.session.user;
    res.locals.userRoles = req.session.roles;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(cookieParser())

// ROUTING
app.use('/company', company)
app.use('/room', room)
app.use('/meeting', meeting)
app.use('/user', user)
app.use('/role', role)

app.get('/', (req, res) => {
    res.redirect('/user/login')
})

app.get('*', (req, res) => {
    res.send('Not found')
})

const port = 3000;
app.listen(port, async() => {
    try {
        console.log(`Serving on port ${port}`)
    } catch (e) {
        console.error(e);
    }
})