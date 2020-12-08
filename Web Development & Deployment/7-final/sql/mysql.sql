--  webdev should be replaced with the name of your database/schema
CREATE TABLE webdev.subscribers(
	id INT PRIMARY KEY AUTO_INCREMENT,
    fName varchar(50),
    lName varchar(50),
    email varchar(50)
);