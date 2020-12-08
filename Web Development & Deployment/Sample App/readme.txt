1. Deployment

To deploy this application, the following node modules are required:

    express
    body-parser
    sqlite3
    bcrypt
    express-validator
    express-session
    passport
    passport-local
    dotenv

You can install all the modules in a single command:

    npm install express body-parser sqlite3 bcrypt express-validator express-session passport passport-local dotenv

__________
2. Database

The SQLite database required for this application is included in the zip file. The name of the database is subscribers.db. The database is populated with some values to demonstrate the usage of the application. The database file is set in app.js right after requiring the sqlite3 module.

To re-create the database from scratch, there is a SQL file inside the utils folder, containing the commands he tables.

Obs. 1: if you are using a database other than SQLite, you should include a file containing the code used to generate the database. In addition, you should point where the database connection is set in your code in case someone else has to alter that connection.

__________
3. User and password

The app has a user called 'myuser' with a password defined as 'mypassword' (without quotations). There is also a file under the directory utils to add a new user/password combination to the database using the bcrypt module to generate a hash for the password. You should run this file from inside its own folder.

__________
4. Organization and Structure

The code is structured in the following way:

The main routes and configurations for the server, authentication and sessions are in the app.js file, included in the root folder.
The documents/pages for the app are also included in the root folder, each named as filename.html. The JS files to control the behavior of the documents are located inside the public -> js folder. Each of these JS files are named after the page they are adding the desired behaviour.
In addition, there is a .env file containing the string used to sign the session cookie to authenticate the user.
