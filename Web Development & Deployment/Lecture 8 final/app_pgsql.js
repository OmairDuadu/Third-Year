const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const pgp = require('pg-promise')({});
const { PreparedStatement: PS } = require('pg-promise');
// connection = protocol://userName:password@host:port/databaseName
const db = pgp('postgres://webdev:tudwebdev20201@localhost:5432/webdev');

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

            const insert = new PS({
                name: 'insert-subscriber',
                text: 'INSERT INTO subscribers (fName, lName, email) VALUES ($1, $2, $3);',
                values: [fName, lName, email]
            });
            // many: will return all rows, expects 1 or more
            // any: will return all rows, expects 0 or more
            // one: will return one row, expects just one
            // none: will return nothing, don't expect any return
            db.none(insert)
                .then(function(rows) {
                    console.log(rows);

                    const query = new PS({
                        name: 'retrieve-last-subscribers',
                        text: 'SELECT id, fName, lName, email FROM subscribers ORDER BY id DESC LIMIT 5;'
                    });
                    db.many(query)
                        .then(function(rows) {
                            console.log(rows);
                            res.status(200).json(rows);
                        })
                        .catch(function(errors) {
                            console.log(errors);
                            res.status(400).json(errors)
                        });
                })
                .catch(function(errors) {
                    console.log(errors);
                });



            // res.json({});
        }


    });