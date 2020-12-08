const express = require('express');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('lecture7.db');

const { body, validationResult } = require('express-validator');

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

            const insert = db.prepare('INSERT INTO subscribers (fName, lName, email) VALUES ($1, $2, $3);');
            insert.run(fName, lName, email);
            insert.finalize();

            const query = db.prepare('SELECT id, fName, lName, email FROM subscribers ORDER BY id DESC LIMIT 5;');
            // query.all - will return all rows, expects at least 1 or more
            // query.any - will return all rows, expects 0 or more
            // query.get - will return the first row only, expects a single row
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

        // res.json({});
    });