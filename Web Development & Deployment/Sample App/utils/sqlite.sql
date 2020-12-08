drop table users;
drop table interests;
drop table subscribers;

CREATE TABLE users(
  user_id varchar(50) primary key,
  user_password varchar
);

CREATE TABLE interests(
  interest_id integer primary key autoincrement,
  interest_name varchar(50)
);

CREATE TABLE subscribers(
  subscriber_email varchar(50) primary key,
  subscriber_fName varchar(50),
  subscriber_lName varchar(50),
  subscriber_research_field integer,
  FOREIGN KEY(subscriber_research_field) REFERENCES interests(interest_id)
);

INSERT INTO interests (interest_name) VALUES ('Machine Learning');
INSERT INTO interests (interest_name) VALUES ('Deep Learning');
INSERT INTO interests (interest_name) VALUES ('Image Classification');
INSERT INTO interests (interest_name) VALUES ('NLP');