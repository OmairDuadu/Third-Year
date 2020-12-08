const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('lecture8.db');

// uncoment these lines and insert your own values
const user = 'user';
const password = 'passw';

const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    // Now we can store the password hash in db.
    const insert = db.prepare('INSERT INTO users (user_id, user_password) VALUES ($1, $2);');
    insert.run(user, hash);
    insert.finalize();
});