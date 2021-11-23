import requests
import json
import mysql.connector
from datetime import date, timedelta

fips = {
    "Allegany": 1,
    "Anne_Arundel": 3,
    "Baltimore": 5,
    "Baltimore_City": 510,
    "Calvert": 9,
    "Caroline": 11,
    "Carroll": 13,
    "Cecil": 15,
    "Charles": 17,
    "Dorchester": 19,
    "Frederick": 21,
    "Garrett": 23,
    "Harford": 25,
    "Howard": 27,
    "Kent": 29,
    "Montgomery": 31,
    "Prince_Georges": 33,
    "Queen_Annes": 35,
    "St_Marys": 37,
    "Somerset": 39,
    "Talbot": 41,
    "Washington": 43,
    "Wicomico": 45,
    "Worcester": 47
}

localDatabase = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",
    database="CovidDB"
)


def sanitize_county_name(dirty_name):
    if dirty_name is None:
        return None
    clean_name = dirty_name.strip().replace(" ", "_").replace("'", "").replace(".", "")
    if clean_name == "Unknown":
        return None
    if clean_name not in fips.keys():
        raise Exception("Unrecognized county name {}".format(clean_name))
    return clean_name


cursor = localDatabase.cursor()
cursor.execute("TRUNCATE TABLE countiesdata_md", ())

caseRateDataUrl = "https://opendata.arcgis.com/datasets/1c17f788b0c14843bfee185bb9c5516c_0.geojson"
caseDataUrl = "https://opendata.arcgis.com/datasets/0573e90adab5434f97b082590c503bc1_0.geojson"
vaccDataUrl = "https://opendata.arcgis.com/datasets/89c9c1236ca848188d93beb5928f4162_0.geojson"
deathDataUrl = "https://opendata.arcgis.com/datasets/3dbd3e633b344c7c9a0d166b1d6a2b03_0.geojson"

caseRateData = json.loads("".join([r.decode() for r in requests.get(caseRateDataUrl)]))
caseData = json.loads("".join([r.decode() for r in requests.get(caseDataUrl)]))
vaccData = json.loads("".join([r.decode() for r in requests.get(vaccDataUrl)]))
deathData = json.loads("".join([r.decode() for r in requests.get(deathDataUrl)]))
state_ID = 24
state_name = "Maryland"
state_init = "MD"
start_date = date(2020, 4, 3)
end_date = date.today() - timedelta(2)
current_date = start_date
while current_date <= end_date:
    print("DATE: {}".format(current_date))
    for county_name, county_id in fips.items():
        # print("  COUNTY: {}".format(county_name))
        for row in caseRateData["features"]:
            row_date = row["properties"]["ReportDate"][:10]
            if row_date == str(current_date):
                county_infection_rate = row["properties"][county_name]
                # print("    County infection rate: ", county_infection_rate)
                break
        else:
            raise Exception("No case rate data found for county {} on date {}".format(county_name, current_date))

        county_vaccination_rate = 0
        for row in vaccData["features"]:
            row_date = row["properties"]["VACCINATION_DATE"][:10]
            if row_date != str(current_date):
                continue
            row_county = sanitize_county_name(row["properties"]["County"])
            if row_county is None:
                continue
            if row_county == county_name:
                county_vaccination_rate = row["properties"]["FullVaccinatedCumulative"]
                # print("    County vaccination rate: ", county_vaccination_rate)
                break

        for row in caseData["features"]:
            row_date = row["properties"]["DATE"][:10]
            if row_date == str(current_date):
                cases = row["properties"][county_name]
                # print("    Cases: ", cases)
                break
        else:
            raise Exception("No case data found for county {} on date {}".format(county_name, current_date))

        for row in deathData["features"]:
            row_date = row["properties"]["DATE"][:10]
            if row_date == str(current_date):
                deaths = row["properties"][county_name]
                # print("    Deaths: ", deaths)
                break
        else:
            raise Exception("No death data found for county {} on date {}".format(county_name, current_date))
        cursor.execute(
            "INSERT INTO countiesdata_md (state_ID, state_name, state_init, county_ID, county_name, county_infection_rate, county_vaccination_rate, cases, confirmed_deaths, dt)" +
            "VALUES                      (%s,       %s,         %s,         %s,        %s,          %s,                    %s,                      %s,    %s,               %s)",
            (24, "Maryland", "MD", county_id, county_name, county_infection_rate, county_vaccination_rate, cases, deaths,
             current_date))
    current_date += timedelta(1)
localDatabase.commit()
