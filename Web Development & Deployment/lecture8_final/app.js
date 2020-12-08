const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('lecture8.db');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// this settings are for development only
app.use(session({
    secret: 'Random string to sign the cookie.',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        const query = db.prepare('SELECT user_id, user_password FROM users WHERE user_id = $1;');
        query.get(username, function(err, row) {
            if (err) { return done(err); }
            if (!row) { return done(null, false, { message: 'User not found.' }); }
            bcrypt.compare(password, row.user_password, function(err, result) {
                if (result == true) {
                    done(null, { id: row.user_id });
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const query = db.prepare('SELECT user_id FROM users WHERE user_id = $1;');
    query.get(id, function(err, row) {
        done(err, row);
    });
});

app.listen(3000, function() {
    console.log("Server running on port 3000");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            console.log(info);
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.redirect('/protected');
        });
    })(req, res, next);
});

function isAuthenticated() {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login');
    }
}

app.get("/protected", isAuthenticated(), function(req, res) {
    res.sendFile(__dirname + "/protected.html");
});

app.get("/public", function(req, res) {
    res.sendFile(__dirname + "/public.html");
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});