require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('subscribers.db');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { body, validationResult } = require('express-validator');
// constants representing SQL queries
const findAllInterests = 'SELECT interest_id, interest_name FROM interests ORDER BY interest_name ASC;';
const findSimilarInterests = 'SELECT interest_id, interest_name FROM interests WHERE interest_name LIKE $1 ORDER BY interest_name ASC;';
const finUserById = "SELECT user_id FROM users WHERE user_id = $1;";
const findPasswordByUserId = "SELECT user_id, user_password FROM users WHERE user_id = $1;";
const findSubscriberByEmail = "SELECT subscriber_email FROM subscribers WHERE subscriber_email = $1;";
const insertSubscriber = 'INSERT INTO subscribers (subscriber_email, subscriber_fName, subscriber_lName, subscriber_research_field) VALUES ($1, $2, $3, $4);';
const deleteSubscriberByEmail = 'DELETE FROM subscribers WHERE subscriber_email = $1;';
const findAllUsers = 'SELECT user_id FROM users ORDER BY user_id ASC;';
const insertNewUser = 'INSERT INTO users (user_id, user_password) VALUES ($1, $2);';
const updateUser = 'UPDATE users SET user_password = $1 WHERE user_id = $2;';
const deleteUser = 'DELETE FROM users WHERE user_id = $1;';
const insertInterest = 'INSERT INTO interests (interest_name) VALUES ($1);';
const updateInterest = 'UPDATE interests SET interest_name = $1 WHERE interest_id = $2;';
const deleteInterest = 'DELETE FROM interests WHERE interest_id = $1;';
// -----------------
// constants representing error messages for responses
const unknownError = 'Unknown error. Please try again later or contact our support.';
const emailNotFound = 'Email not found!';
const userNotFound = 'Username not found!';
const incorrectPassword = 'Incorrect password!';
// -----------------

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done) {
    const userQuery = db.prepare(findPasswordByUserId);
    userQuery.get(username, function(error, row) {
        if (error) return err // error with query
        if (!row) return done(null, false, { message: userNotFound });
        bcrypt.compare(password, row.user_password, function(err, res) {
            if (res == true) done(null, { id: row.user_id });
            else return done(null, false, { message: incorrectPassword });
        });
    });
}));

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const userQuery = db.prepare(finUserById);
    userQuery.get(id, function(err, row) {
        if (!row) return done(null, false);
        return done(null, row);
    });
});

app.listen(3000, function() {
    console.log("Server running on port 3000");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err)
            return next(err);
        }
        if (!user) {
            console.log(info);
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/admin');
        });
    })(req, res, next);
});


function isAuthenticated() {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }
}

app.get("/admin", isAuthenticated(), function(req, res) {
    res.sendFile(__dirname + "/admin.html");
});

app.get('/retrieveResearchFields', function(req, res) {
    const query = db.prepare(findAllInterests);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/retrieveSimilarResearchFields', function(req, res) {
    const interestName = req.body.interestName;
    const query = db.prepare(findSimilarInterests);
    query.all(`${interestName}%`, function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/insertSubscriber', [
        body('fName').isLength({ min: 3, max: 50 }),
        body('lName').isLength({ min: 3, max: 50 }),
        body('email').isLength({ min: 3, max: 50 }).isEmail(),
        body('researchField').isInt(),
    ],
    function(req, res) {
        const validErrors = validationResult(req);

        if (!validErrors.isEmpty()) {
            console.log(validErrors);
            res.status(400).json({ errors: validErrors.array() });

        } else {

            const fName = req.body.fName;
            const lName = req.body.lName;
            const email = req.body.email;
            const interest = req.body.researchField;
            console.log(`Subscribing: ${fName} ${lName}, ${email}, ${interest}`);

            const emailQuery = db.prepare(findSubscriberByEmail);
            emailQuery.get(email, function(error, rows) {
                if (error) {
                    console.log(error);
                    res.status(400).json({ error: unknownError });
                } else {
                    if (rows) {
                        const errorMsg = 'Email already subscribed.';
                        console.log(errorMsg);
                        res.status(400).json({ error: errorMsg });
                    } else {
                        const insert = db.prepare(insertSubscriber);
                        insert.run(email, fName, lName, interest);
                        insert.finalize(function(error) {
                            if (error) {
                                console.log(error);
                                res.status(400).json({ error: unknownError });
                            } else {
                                res.status(200).json({});
                            }
                        });
                    }
                }
            });
        }
    });

app.get("/pageUnsubscribe", function(req, res) {
    res.sendFile(__dirname + "/unsubscribe.html");
});

app.post('/unsubscribe', [
    body('email').isLength({ min: 3, max: 50 }).isEmail()
], function(req, res) {

    const validErrors = validationResult(req);

    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        res.status(400).json({ errors: validErrors.array() });

    } else {
        const email = req.body.email;
        console.log(`Unsubscribing: ${email}`);

        const emailQuery = db.prepare(findSubscriberByEmail);
        emailQuery.get(email, function(error, rows) {
            if (error) {
                console.log(error);
                res.status(400).json({ error: unknownError });
            } else {
                if (rows) {
                    const remove = db.prepare(deleteSubscriberByEmail);
                    remove.run(email);
                    remove.finalize(function(error) {
                        if (error) {
                            console.log(error);
                            res.status(400).json({ error: unknownError });
                        } else {
                            res.status(200).json({});
                        }
                    });
                } else {
                    console.log(emailNotFound);
                    res.status(400).json({ error: emailNotFound });
                }

            }
        });
    }
});

app.get("/interests", isAuthenticated(), function(req, res) {

    res.sendFile(__dirname + "/interests.html");
});

app.post("/insertInterest", [
        body('interestName').isLength({ min: 3, max: 50 })
    ], isAuthenticated(),
    function(req, res) {
        const validErrors = validationResult(req);
        if (!validErrors.isEmpty()) {
            console.log(validErrors);
            res.status(400).json({ errors: validErrors.array() });
        } else {
            const interestName = req.body.interestName;
            const insert = db.prepare(insertInterest);
            insert.run(interestName);
            insert.finalize();

            const query = db.prepare(findAllInterests);
            query.all(function(error, rows) {
                if (error) {
                    console.log(error);
                    res.status(400).json(error);
                } else {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            });
        }
    });

app.post("/updateInterest", [
        body('interestName').isLength({ min: 3, max: 50 })
    ], isAuthenticated(),
    function(req, res) {

        const validErrors = validationResult(req);
        if (!validErrors.isEmpty()) {
            console.log(validErrors);
            res.status(400).json({ errors: validErrors.array() });
        } else {
            const interestId = parseInt(req.body.interestId);
            const interestName = req.body.interestName;
            const update = db.prepare(updateInterest);
            update.run(interestName, interestId);
            update.finalize();

            const query = db.prepare(findAllInterests);
            query.all(function(error, rows) {
                if (error) {
                    console.log(error);
                    res.status(400).json(error);
                } else {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            });
        }

    });

app.post("/deleteInterest", isAuthenticated(), function(req, res) {
    const interestId = parseInt(req.body.interestId);
    const deleteStmt = db.prepare(deleteInterest);
    deleteStmt.run(interestId);
    deleteStmt.finalize(function() {

    });

    const query = db.prepare(findAllInterests);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log(rows);
            res.status(200).json(rows);
        }
    });

});

app.get("/users", isAuthenticated(), function(req, res) {
    res.sendFile(__dirname + "/users.html");
});

app.get('/retrieveAllUsers', isAuthenticated(), function(req, res) {
    const query = db.prepare(findAllUsers);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
    });

});

app.post("/insertNewUser", [
    body('username').isLength({ min: 3, max: 50 }),
    body('password').isLength({ min: 3, max: 50 }),
], isAuthenticated(), function(req, res) {
    const validErrors = validationResult(req);
    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        res.status(400).json({ errors: validErrors.array() });
    } else {
        const username = req.body.username;
        const password = req.body.password;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Now we can store the password hash in db.
            const insert = db.prepare(insertNewUser);
            insert.run(username, hash);
            insert.finalize();

            const query = db.prepare(findAllUsers);
            query.all(function(error, rows) {
                if (error) {
                    console.log(error);
                    res.status(400).json(error);
                } else {
                    res.status(200).json(rows);
                }
            });
        });
    }
});

app.post("/updateUser", [
    body('username').isLength({ min: 3, max: 50 }),
    body('password').isLength({ min: 3, max: 50 }),
], isAuthenticated(), function(req, res) {
    const validErrors = validationResult(req);
    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        res.status(400).json({ errors: validErrors.array() });
    } else {
        const username = req.body.username;
        const password = req.body.password;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Now we can store the password hash in db.
            const update = db.prepare(updateUser);
            update.run(hash, username);
            update.finalize();

            const query = db.prepare(findAllUsers);
            query.all(function(error, rows) {
                if (error) {
                    console.log(error);
                    res.status(400).json(error);
                } else {
                    res.status(200).json(rows);
                }
            });
        });
    }
});

app.post("/deleteUser", [
    body('username').isLength({ min: 3, max: 50 }),
], isAuthenticated(), function(req, res) {
    const validErrors = validationResult(req);
    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        res.status(400).json({ errors: validErrors.array() });
    } else {
        const username = req.body.username;
        // Now we can store the password hash in db.
        const deleteStmt = db.prepare(deleteUser);
        deleteStmt.run(username);
        deleteStmt.finalize();

        const query = db.prepare(findAllUsers);
        query.all(function(error, rows) {
            if (error) {
                console.log(error);
                res.status(400).json(error);
            } else {
                res.status(200).json(rows);
            }
        });
    }
});