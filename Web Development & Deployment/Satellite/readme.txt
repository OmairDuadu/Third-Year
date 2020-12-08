Youtube link for Demo:
https://www.youtube.com/watch?v=1-6nmHsm0qY

1. Deployment

These are the required application to run the web site

	node.js
	express
    	body-parser
    	sqlite3
    	bcrypt
    	express-validator
    	express-session
    	passport
    	passport-local

To instal it you can enter
	npm install express body-parser sqlite3 bcrypt express-validator express-session passport passport-local

-------------------------------------------------------------------------------------------------------------------------
2. Database

SQLite
Our SQLite  database is in our zip called Satellite.db. This database has all the required tables and information to run our application from the ground up
Node.js
We also used Node.js to interact with our SQLite and help store the variables and information that is required to interact with the website

---------------------------------------------------------------------------------------------------------------------------
3. User and password
This application comes with a preconfigured user, Email:"giancarlo@tudublin.ie" Password:"password12345", it also allows the user to make their own 
username and password by integrating the user's own generated email of their choosing, after creating a user and password it is added to the sattelite.db 
users table and the user can now login to the website.

--------------------------------------------------------------------------------------------------------------------------------------------------
4. Organization and structure

The Main html section of the code are located in the root folder.
The js files are located in a sub folder in the public folder called Js, that contains all the htmls javascript. They are all named according to the html file
that they respond to.
In addition their is also a images folder which holds all the images and favicon. There is also a css folder which of course holds the Css file for the project.