import requests
import json
import mysql.connector

print("Connecting to local database...")
localDatabase = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",
    database="CovidDB"
)

# https://gist.github.com/rogerallen/1583593
state_abbrev = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "United States Minor Outlying Islands": "UM",
    "Virgin Islands": "VI",
}

cursor = localDatabase.cursor()
cursor.execute("TRUNCATE TABLE countiesdata", ())

case_data_link = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"

print("Getting case data from the web...")
case_data_raw = b''.join([line for line in requests.get(case_data_link)])
case_data_raw_lines = case_data_raw.decode().split('\n')
print("Moving case data to local database...")
for line in case_data_raw_lines[1:]:
    date, county_name, state_name, county_id, cases, deaths = line.split(',')
    if not county_id:
        if county_name == "Unknown":
            continue
        print("County id missing: {}".format(line))
        continue
    if not deaths:
        deaths = "0"
    # TODO Update all of the fields in the below line
    cursor.execute(
        "INSERT INTO countiesdata (state_ID,               state_name, state_init,               county_ID,             county_name, county_infection_rate, county_vaccination_rate, cases, confirmed_deaths, dt)" +
        "VALUES                   (%s,                     %s,         %s,                       %s,                    %s,          %s,                    %s,                      %s,    %s,               %s)",
                                  (int(county_id) // 1000, state_name, state_abbrev[state_name], int(county_id) % 1000, county_name, 0,                     0,                       cases, deaths,           date))
    localDatabase.commit()
