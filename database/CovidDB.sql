CREATE DATABASE IF NOT EXISTS CovidDB;
USE CovidDB; 
DROP TABLE IF EXISTS county_infection;
DROP TABLE IF EXISTS county_vaccination;
DROP TABLE IF EXISTS county;
DROP TABLE IF EXISTS states_infection;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS states_vaccination;

CREATE TABLE states_infection( 
	state_ID varchar(2),
    state_infection_rate numeric(4), 
	dt date, 
    PRIMARY KEY(state_ID, dt)
);

CREATE TABLE states( 
	state_ID varchar(2),
    state_name varchar(30), 
	state_geo varchar(30),
    PRIMARY KEY(state_ID)
);

CREATE TABLE states_vaccination( 
	state_ID varchar(2),
    state_vaccination_rate numeric(4), 
	dt date, 
    PRIMARY KEY(state_ID, dt)
);

CREATE TABLE county( 
	state_ID varchar(2),
    county_ID numeric(5), 
    county_name varchar(30), 
	county_geo varchar(30), 
    PRIMARY KEY(county_ID),
    FOREIGN KEY(state_ID) REFERENCES states(state_ID)
);   

CREATE TABLE county_infection( 
    state_ID varchar(2),
    county_ID numeric(5),
    county_infection_rate numeric(4), 
	dt date, 
    PRIMARY KEY(state_ID, county_ID, dt),
    FOREIGN KEY(county_ID) REFERENCES county(county_ID),
    FOREIGN KEY(state_ID) REFERENCES states(state_ID)
);

CREATE TABLE county_vaccination( 
    state_ID varchar(2),
    county_ID numeric(5),
    county_vaccination_rate numeric(4), 
	dt date, 
    PRIMARY KEY(state_ID, county_ID, dt),
    FOREIGN KEY(county_ID) REFERENCES county(county_ID),
    FOREIGN KEY(state_ID) REFERENCES states(state_ID)
);