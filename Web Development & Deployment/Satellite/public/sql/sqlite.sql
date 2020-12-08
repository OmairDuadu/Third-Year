CREATE TABLE contact(
  id integer primary key autoincrement,
  cfName varchar(50),
  clName varchar(50),
  cEmail varchar(50),
  cphoneNumber varchar(15),
  cMessage varchar(250)
);


CREATE TABLE register(
  id integer primary key autoincrement,
  rfName varchar(50),
  rlName varchar(50),
  rEmail varchar(50),
  rphoneNumber varchar(15),
  rPassword varchar(20),
  rconfirmPassword varchar(20)
);


CREATE TABLE users(
  id integer primary key autoincrement,
  user_id varchar(50),
  user_password varchar(500)
);