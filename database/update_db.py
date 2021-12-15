import requests
import mysql.connector
from os.path import realpath
from dataclasses import dataclass
from typing import *
import re

print("Connecting to local database...")
localDatabase = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",
    database="CovidDB",
    allow_local_infile=True
)

# https://gist.github.com/rogerallen/1583593
state_init_dict = {
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

infile = open("infile.txt", "w")

cursor = localDatabase.cursor()
cursor.execute("TRUNCATE TABLE countiesdata", ())

case_data_link = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
inf_data_link = "https://data.cdc.gov/api/views/nra9-vzzn/rows.csv?accessType=DOWNLOAD"
vacc_data_link = "https://data.cdc.gov/api/views/8xkx-amqh/rows.csv?accessType=DOWNLOAD"


def convert_date(old_date: str):
    m, d, y = old_date.split('/')
    return "{}-{}-{}".format(y, m, d)


def split_inf_line(line: str):
    pattern = re.compile(r'''((?:[^,"]|"[^"]*")+)''')
    return pattern.split(line)[1::2]


@dataclass
class Entry:
    state_id: int = None
    state_name: str = None
    state_init: str = None
    county_id: int = None
    county_name: str = None
    county_infection_rate: int = 0
    county_vaccination_rate: float = 0
    cases: int = 0
    confirmed_deaths: int = 0
    dt: str = None


print("Getting case and death data from the web...")
case_data_raw = b''.join([line for line in requests.get(case_data_link)])
case_data_raw_lines = case_data_raw.decode().split('\n')[1:]
print("Getting vaccination data from the web...")
vacc_data_raw = b''.join([line for line in requests.get(vacc_data_link)])
vacc_data_raw_lines = vacc_data_raw.decode().split('\n')[1:-1]
vacc_data_raw_lines.reverse()
print("Getting infection data from the web...")
inf_data_raw = b''.join([line for line in requests.get(inf_data_link)])
inf_data_raw_lines = inf_data_raw.decode().split('\n')[1:-1]
inf_data_raw_lines.sort(key=lambda x: convert_date(x.split(',')[3]))
print("Moving case data to local database...")
current_date = case_data_raw_lines[0].split(',')[0]
case_data_index = 0
vacc_data_index = 0
inf_data_index = 0
while True:
    print("Processing date {}".format(current_date))
    date_data: Dict[int, Entry] = {}
    case_line = ""
    while case_data_index < len(case_data_raw_lines) and (case_line := case_data_raw_lines[case_data_index]).split(',')[0] == current_date:
        # print("  Processing case index {}".format(case_data_index))
        date, county_name, state_name, fips, cases, deaths = case_line.split(',')
        if not fips:
            case_data_index += 1
            continue
        fips = int(fips)
        if fips not in date_data.keys():
            date_data[fips] = Entry()
        date_data[fips].dt = date
        date_data[fips].county_name = county_name
        date_data[fips].state_name = state_name
        date_data[fips].state_id = fips // 1000
        date_data[fips].county_id = fips % 1000
        date_data[fips].state_init = state_init_dict[state_name]
        date_data[fips].cases = cases
        date_data[fips].confirmed_deaths = deaths
        case_data_index += 1
    next_date = case_line.split(',')[0]
    while vacc_data_index < len(vacc_data_raw_lines) and (date := convert_date((vacc_line := vacc_data_raw_lines[vacc_data_index]).split(',')[0])) == current_date:
        # print("  Processing vacc index {}".format(vacc_data_index))
        vacc_line_data = vacc_line.split(',')
        if vacc_line_data[1] == "UNK":
            vacc_data_index += 1
            continue
        fips = int(vacc_line_data[1])
        try:
            date_data[fips].county_vaccination_rate = float(vacc_line_data[5])
        except KeyError:
            pass
        vacc_data_index += 1
    while inf_data_index < len(inf_data_raw_lines) and (date := convert_date((inf_line := inf_data_raw_lines[inf_data_index]).split(',')[3])) == current_date:
        # print("  Processing inf index {}".format(inf_data_index))
        inf_line_data = inf_line.split(',')
        fips = int(inf_line_data[2])
        if inf_line_data[4] and inf_line_data[4] != "suppressed":
            try:
                _ = date_data[fips].county_infection_rate
                date_data[fips].county_infection_rate = float(inf_line_data[4])
            except KeyError:
                pass
            except ValueError:
                date_data[fips].county_infection_rate = float(split_inf_line(inf_line)[4].replace("\"", "").replace(",", ""))
        inf_data_index += 1
    for key, val in date_data.items():
        result = infile.write(("\"{}\","*10+"\n").format(val.state_id, val.state_name,
                                                         state_init_dict[val.state_name], val.county_id,
                                                         val.county_name, val.county_infection_rate,
                                                         val.county_vaccination_rate, val.cases,
                                                         val.confirmed_deaths, val.dt))
    infile.flush()
    if current_date == next_date:
        break
    current_date = next_date

infile.close()
cursor.execute("LOAD DATA LOCAL INFILE '{}' ".format(realpath(infile.name).replace('\\', '/')) +
               "INTO TABLE countiesdata "
               "FIELDS TERMINATED BY ',' "
               "ENCLOSED BY '\"' "
               "LINES TERMINATED BY '\\r\\n' "
               "(state_ID, state_name, state_init, county_ID, county_name, county_infection_rate, "
               "county_vaccination_rate, cases, confirmed_deaths, dt);")
localDatabase.commit()
