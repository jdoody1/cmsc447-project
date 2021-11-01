import requests
import json
import mysql.connector

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
  host="localhost",
  user="root",
  password="password",
  database="CovidDB"
)

cursor = localDatabase.cursor()
cursor.execute("TRUNCATE TABLE county_infection", ())
cursor.execute("DELETE FROM county", ())
cursor.execute("DELETE FROM states", ())
cursor.execute("INSERT INTO states (state_ID, state_name, state_geo) VALUES (%s, %s, %s)", ("MD", "Maryland", ""))
for key, val in fips.items():
	cursor.execute("INSERT INTO county (state_ID, county_ID, county_name, county_geo) VALUES (%s, %s, %s, %s)", ("MD", val, key, ""))
localDatabase.commit()
insertSql = "INSERT INTO county_infection (state_ID, county_ID, county_infection_rate, dt) VALUES (%s, %s, %s, %s)"

caseDataUrl = "https://opendata.arcgis.com/datasets/1c17f788b0c14843bfee185bb9c5516c_0.geojson"

caseDataRaw = requests.get(caseDataUrl)
caseDataRawString = ""
for row in caseDataRaw:
	caseDataRawString += row.decode()
caseData = json.loads(caseDataRawString)
for feature in caseData["features"]:
	for county in feature["properties"].keys():
		if county in ["OBJECTID", "ReportDate"]:
			continue
		reportDate = feature["properties"]["ReportDate"].split("T")[0]
		cursor.execute(insertSql, ("MD", fips.get(county,county), feature["properties"][county], reportDate))
localDatabase.commit()