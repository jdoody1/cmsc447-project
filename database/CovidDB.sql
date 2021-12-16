CREATE DATABASE IF NOT EXISTS CovidDB;
USE CovidDB; 
DROP TABLE IF EXISTS countiesData;

CREATE TABLE countiesData(
    state_ID numeric(5),
    state_name varchar(40),
    state_init varchar(2), 
    county_ID numeric(5),
    county_name varchar(40), 
    county_infection_rate numeric(5, 2),
    county_vaccination_rate numeric(10, 2),
    cases numeric(10, 2),
    confirmed_deaths numeric(10, 2),
	dt date
);
