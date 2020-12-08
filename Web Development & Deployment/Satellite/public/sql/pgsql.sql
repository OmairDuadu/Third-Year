CREATE TABLE subscribers(
  id serial primary key,
  fName varchar(50),
  lName varchar(50),
  email varchar(50)
);


-- GRANT ALL ON subscribers TO webdev ;
-- GRANT ALL ON subscribers_id_seq TO webdev;