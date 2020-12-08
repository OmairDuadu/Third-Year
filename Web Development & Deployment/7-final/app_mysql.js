const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'webdev',
    password: 'webdevtud20201',
    database: 'webdev'
});

conn.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function() {
    console.log("Server running on port 3000");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/insertSubscriber', [
        body('fName').isLength({ min: 3, max: 50 }),
        body('lName').isLength({ min: 3, max: 50 }),
        body('email').isLength({ min: 3, max: 50 }).isEmail()
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
            console.log(`${fName} ${lName}, ${email}`);

            conn.execute(
                'INSERT INTO subscribers (fName, lName, email) VALUES (?, ?, ?);', [fName, lName, email],
                function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.status(400).json(error);
                    }
                }
            );

            conn.execute(
                'SELECT id, fName, lName, email FROM subscribers ORDER BY id DESC LIMIT 5;',
                function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.status(400).json(error);
                    } else {
                        console.log(rows);
                        res.status(200).json(rows);
                    }

                }
            );

            // res.json({});
        }


    });