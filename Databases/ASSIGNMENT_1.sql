CREATE TABLE ad (
    ad_id               VARCHAR2(250) NOT NULL,
    ad_brand_name       VARCHAR2(250),
    ad_certification    VARCHAR2(250),
    ad_duration         NUMBER,
    ad_suitable_rating  VARCHAR2(250),
    agency_ag_name      VARCHAR2(250) NOT NULL,
    ad_description      VARCHAR2(250),
    agency_ag_name2     VARCHAR2(250) NOT NULL,
    client_c_id         VARCHAR2(250) NOT NULL
);

ALTER TABLE ad ADD CONSTRAINT ad_pk PRIMARY KEY ( ad_id );

CREATE TABLE agency (
    ag_name          VARCHAR2(250) NOT NULL,
    ag_id            VARCHAR2(250),
    ag_ph            NUMBER,
    ag_contact_name  VARCHAR2(250)
);

ALTER TABLE agency ADD CONSTRAINT agency_pk PRIMARY KEY ( ag_name );

CREATE TABLE client (
    c_id            VARCHAR2(250) NOT NULL,
    c_name          VARCHAR2(250),
    agency_ag_name  VARCHAR2(250) NOT NULL,
    c_business      VARCHAR2(250)
);

ALTER TABLE client ADD CONSTRAINT client_pk PRIMARY KEY ( c_id );

CREATE TABLE contract (
    contract_id       VARCHAR2(250) NOT NULL,
    c_no_of_runs      NUMBER,
    c_book_date       DATE,
    c_startdate       NUMBER,
    c_duedate         VARCHAR2(250),
    agency_ag_name    VARCHAR2(250) NOT NULL,
    region_region_id  VARCHAR2(250) NOT NULL,
    agency_ag_name1   VARCHAR2(250) NOT NULL
);

ALTER TABLE contract ADD CONSTRAINT contract_pk PRIMARY KEY ( contract_id );

CREATE TABLE program (
    prog_id               VARCHAR2(250) NOT NULL,
    prog_name             VARCHAR2(100),
    prog_date_time        VARCHAR2(250),
    prog_target_audience  VARCHAR2(250),
    prog_ratings          VARCHAR2(250),
    prog_before           VARCHAR2(250),
    prog_after            VARCHAR2(250)
);

ALTER TABLE program ADD CONSTRAINT program_pk PRIMARY KEY ( prog_id );

CREATE TABLE region (
    region_id     VARCHAR2(250) NOT NULL,
    region_name   VARCHAR2(250),
    slot          NUMBER,
    cost          NUMBER,
    daysofweek    NUMBER,
    r_start_time  NUMBER,
    r_end_time    NUMBER,
    r_date_from   VARCHAR2(250)
);

ALTER TABLE region ADD CONSTRAINT daytime_region_pk PRIMARY KEY ( region_id );

CREATE TABLE slots (
    s_id              VARCHAR2(250) NOT NULL,
    s_date_time       VARCHAR2(250),
    s_day             VARCHAR2(100),
    s_status          VARCHAR2(100),
    region_region_id  VARCHAR2(250) NOT NULL,
    program_prog_id   VARCHAR2(250) NOT NULL
);

ALTER TABLE slots ADD CONSTRAINT slots_pk PRIMARY KEY ( s_id );

CREATE TABLE slots_ad (
    slots_s_id  VARCHAR2(250) NOT NULL,
    ad_ad_id    VARCHAR2(250) NOT NULL
);

ALTER TABLE slots_ad ADD CONSTRAINT slots_ad_pk PRIMARY KEY ( slots_s_id,
                                                              ad_ad_id );

ALTER TABLE ad
    ADD CONSTRAINT ad_agency_fk FOREIGN KEY ( agency_ag_name )
        REFERENCES agency ( ag_name );

ALTER TABLE ad
    ADD CONSTRAINT ad_agency_fkv2 FOREIGN KEY ( agency_ag_name2 )
        REFERENCES agency ( ag_name );

ALTER TABLE ad
    ADD CONSTRAINT ad_client_fk FOREIGN KEY ( client_c_id )
        REFERENCES client ( c_id );

ALTER TABLE client
    ADD CONSTRAINT client_agency_fk FOREIGN KEY ( agency_ag_name )
        REFERENCES agency ( ag_name );

ALTER TABLE contract
    ADD CONSTRAINT contract_agency_fk FOREIGN KEY ( agency_ag_name )
        REFERENCES agency ( ag_name );

ALTER TABLE contract
    ADD CONSTRAINT contract_agency_fkv1 FOREIGN KEY ( agency_ag_name1 )
        REFERENCES agency ( ag_name );

ALTER TABLE contract
    ADD CONSTRAINT contract_region_fk FOREIGN KEY ( region_region_id )
        REFERENCES region ( region_id );

ALTER TABLE slots_ad
    ADD CONSTRAINT slots_ad_ad_fk FOREIGN KEY ( ad_ad_id )
        REFERENCES ad ( ad_id );

ALTER TABLE slots_ad
    ADD CONSTRAINT slots_ad_slots_fk FOREIGN KEY ( slots_s_id )
        REFERENCES slots ( s_id );

ALTER TABLE slots
    ADD CONSTRAINT slots_program_fk FOREIGN KEY ( program_prog_id )
        REFERENCES program ( prog_id );

ALTER TABLE slots
    ADD CONSTRAINT slots_region_fk FOREIGN KEY ( region_region_id )
        REFERENCES region ( region_id );
        
        
--Customers who bought a workbench but no timber (A –B)
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME  > 500
MINUS
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME = 2000;



--Customers who bought timber but no workbench   (B –A)
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME = 2000
MINUS
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME  < 1000;


--Customers who bought both timber and a workbench (A ? B)
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME  > 500
INTERSECT
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME = 2000;

    
    
--Customers who bought either timber or a workbench (A U B)    
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME  > 500
UNION
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME = 2000;


--Customers who bought either timber or a workbench, but not both  A xor B (A U B) -(A ? B    
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME  > 500
UNION
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME = 1800
MINUS
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME = 2000;


--Customers who only bought a workbench (A -¬A)	
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME > 500
EXCEPT
SELECT REGION_ID, REGION_NAME, r_start_time FROM REGION WHERE R_START_TIME > 500;



--Customers who bought all stock items (relational divide).
SELECT REGION_ID, REGION_NAME FROM REGION ;



        
SELECT * FROM PROGRAM;
SELECT * FROM REGION;
SELECT * FROM AD;
SELECT * FROM AGENCY;
SELECT * FROM CLIENT;
SELECT * FROM CONTRACT;
select * From slots;
select * From slots_ad;



DROP TABLE AD;
DROP TABLE AGENCY;
DROP TABLE CLIENT;
DROP TABLE CONTRACT;
DROP TABLE REGION;
DROP TABLE SLOTS;
DROP TABLE SLOTS_AD;
DROP TABLE PROGRAM;

COMMIT;
