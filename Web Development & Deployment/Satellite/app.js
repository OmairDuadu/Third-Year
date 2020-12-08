// Requiring all the modules 
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('satellite.db');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const { validationResult } = require("express-validator");
const {body, validatorResults} = require("express-validator")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// In real world this would be different
app.use(session({
    secret:'Random string to sign the cookie',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Authnticaion of password
passport.use(new LocalStrategy(
    function(username, password, done) {
        const lquery = db.prepare('SELECT user_id, user_password FROM users WHERE user_id = $1');
        lquery.get(username, function(err, row){
            if (err) { return done(err); }
            if (!row) { return done(null, false, {message:'USER NOT FOUND'}); }
            bcrypt.compare(password, row.user_password, function (err, result){
                if (result == true){
                    done (null, {id: row.user_id});
                }else{
                    return done(null,false, {message:'Incorrect password'});
                }
            });
        });  
    }
  ));
// To configure the session 
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    const query = db.prepare('SELECT user_id FROM users WHERE user_id = $1');
    query.get(id, function(err, row){
        done(err, row);
    });
});


// Below is allthe listeners to move between the pages in the 
app.listen(3000, function(){
    console.log("Server is running on port 3000")
});

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/index.html", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/services.html", function(req, res){
    res.sendFile(__dirname+"/services.html");
});

app.get("/contact.html", function(req, res){
    res.sendFile(__dirname+"/contact.html");
});

app.get("/employees.html", function(req, res){
    res.sendFile(__dirname+"/employees.html");
});

//login authentication and gets
app.get("/login.html", function(req, res){
    res.sendFile(__dirname+"/login.html");
});

app.get("/login", function(req, res){
    res.sendFile(__dirname+"/login.html");
});
// When attempting to login
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
        return res.redirect('/protected.html');
      });
    })(req, res, next);
});

//
function isAuthenticated(){
    return function(req, res, next){
        if (req.isAuthenticated()){
           return next()
        }
        res.redirect('/login.html');
        
    }
}

app.get("/protected.html", isAuthenticated(), function(req, res) {
    res.sendFile(__dirname + "/protected.html");
});  

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

// Contact us page functioanlity 
app.post('/insertContact', [

    body('cfName').isLength({min: 3, max:50}),
    body('clName').isLength({min: 3, max:50}),
    body('cEmail').isLength({min: 3, max:50}).isEmail(),
    body('cphoneNumber').isLength({min: 10, max:15}),
    body('cMessage').isLength({min: 3, max:250}),    

    ],
    function(req, res){ 
        const validErrors = validationResult(req);
        if (!validErrors.isEmpty()){
            console.log(validErrors);
            res.status(400).json({ errors: validErrors.array()});
        }else{
        const cfName = req.body.cfName;
        const clName = req.body.clName;
        const cEmail = req.body.cEmail;
        const cphoneNumber = req.body.cphoneNumber;
        const cMessage = req.body.cMessage;
        console.log(`${cfName} ${clName} ${cEmail} ${cphoneNumber} ${cMessage}`);

        //to insert data into database
        const insert = db.prepare('INSERT INTO contact (cfName, clName, cEmail, cphoneNumber, cMessage) VALUES ($1, $2, $3, $4, $5);');
        insert.run(cfName, clName, cEmail, cphoneNumber, cMessage);
        insert.finalize();
    
        const query = db.prepare('SELECT id, cfName, clName, cEmail, cphoneNumber, cMessage FROM  contact ORDER BY id DESC LIMIT 1;');
        //query.all(); - will return all rows, expects at least 1 or more
        //query.any(); - will return all rows, expects 0 or more
        //query.net(); - will return the first row only, expects a single row

        query.all(function(error, rows){
            if (error){
                console.log(error);
                res.status(400).json(error);
            }
            else
            {
                console.log(rows);
                res.status(200).json(rows);
            }
        });
    }
    // res.json({});
});

// Registration on the login page functioanlity 
app.post('/insertRegister', [

    body('rfName').isLength({min: 3, max:50}),
    body('rlName').isLength({min: 3, max:50}),
    body('rEmail').isLength({min: 3, max:50}).isEmail(),
    body('rphoneNumber').isLength({min: 10, max:15}),
    body('rPassword').isLength({min: 8, max:50}),    
    body('rconfirmPassword').isLength({min: 8, max:50}),    

    ],
    function(req, res){ 
        const validErrors = validationResult(req);
        if (!validErrors.isEmpty()){
            console.log(validErrors);
            res.status(400).json({ errors: validErrors.array()});
        }else{
        const rfName = req.body.rfName;
        const rlName = req.body.rlName;
        const rEmail = req.body.rEmail;
        const rphoneNumber = req.body.rphoneNumber;
        const rPassword = req.body.rPassword;
        const rconfirmPassword = req.body.rconfirmPassword;
        console.log(`${rfName} ${rlName} ${rEmail} ${rphoneNumber} ${rPassword} ${rconfirmPassword}`);

        //to insert data into registered people table
        const insert = db.prepare('INSERT INTO register (rfName, rlName, rEmail, rphoneNumber, rPassword, rconfirmPassword) VALUES ($1, $2, $3, $4, $5, $6);');
        insert.run(rfName, rlName, rEmail, rphoneNumber, rPassword, rconfirmPassword);
        insert.finalize();

        //to insert data into user table with an encrypted password
        const saltRounds = 10;
        bcrypt.hash(rPassword, saltRounds, function(err, hash){
            const insert2 = db.prepare('INSERT INTO users (user_id, user_password) VALUES ($1, $2);');
            insert2.run(rEmail, hash);
            insert2.finalize();
        })

        //query.all(); - will return all rows, expects at least 1 or more
        //query.any(); - will return all rows, expects 0 or more
        //query.net(); - will return the first row only, expects a single row
        // SELECT id, rfName, rlName, rEmail, rphoneNumber, rPassword, rconfirmPassword FROM  register ORDER BY id DESC Limit 1; 
        // SELECT id, user_id, user_password FROM  users ORDER BY id DESC Limit 1;

        const query = db.prepare('SELECT id, rfName, rlName, rEmail, rphoneNumber, rPassword, rconfirmPassword FROM  register ORDER BY id DESC Limit 1;');
        query.all(function(error, rows){
            if (error){
                console.log(error);
                res.status(400).json(error);
            }
            else
            {
                console.log(rows);
                res.status(200).json(rows);
            }
        });    
    }
});
