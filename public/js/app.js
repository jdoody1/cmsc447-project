$(document).ready(function() {
    $("div.specialPage").css("display", "none");
    $("div.homePage").css("display", "");

    for (var i = 0; i < countiesData.features.length; i++) {
        if ($("#stateSelectMenu option[value = '" + countiesData.features.at(i)["properties"]["INITIALS"] + "']").length > 0) {}

        else {
            stateSelectMenu.innerHTML += "<option value = '" + countiesData.features.at(i)["properties"]["INITIALS"] 
            + "'>" + countiesData.features.at(i)["properties"]["STATE"] + "</option>";
        }

        states.push({
            key:   countiesData.features.at(i)["properties"]["ID"],
            value: countiesData.features.at(i)["properties"]["INITIALS"]
        });
    }

    states = [...new Map(states.map(item => [JSON.stringify(item), item])).values()];
    loadMap();
    document.getElementById("typeOfMapMenu").value = 2;
    $(".leaflet-control-zoom").css("visibility", "hidden");
    document.getElementById("map").style.opacity = "0.4";
    map._handlers.forEach(function(handler) {
        handler.disable();
    });
    dateOfDataMenu.disabled = true;

    $.each(states, function(k, v) {
        fetch(`${URL}${states[k].value}`)
        .then(response => response.json())
        .then(data => {
            var numOfCounties = 0;

            for (var i = 0; i < countiesData.features.length; i++) {
                if (countiesData.features.at(i)["properties"]["INITIALS"] == `${states[k].value}`) {
                    numOfCounties += 1;
                }
            }

            for (var i = 0; i < numOfCounties; i++) {
                let uniqueID = printFips(data['data'].at(data['data'].length - 1 - i)["state_ID"], data['data'].at(data['data'].length - 1 - i)["county_ID"]);
                let val = data['data'].at(data['data'].length - 1 - i);

                leafletInfs.push({
                    key:   uniqueID,
                    value: val["county_infection_rate"]
                });

                leafletVaccs.push({
                    key:   uniqueID,
                    value: val["county_vaccination_rate"]
                });

                leafletCases.push({
                    key:   uniqueID,
                    value: val["cases"]
                });

                leafletDeaths.push({
                    key:   uniqueID,
                    value: val["confirmed_deaths"]
                });
            }
        });
    });
});

var states = [];
var datesArray = [];
var infRateArray = [];
var vaccRateArray = [];
var leafletInfs = [];
var leafletVaccs = [];
var leafletCases = [];
var leafletDeaths = [];
var mapColorNum = 2;
const URL = 'http://localhost:3000/getData_';
const pages = {1:"homePage", 2:"newsPage", 3:"settingsPage", 4:"aboutPage", 5:"helpPage", 6:"privPolPage", 7:"tosPage", 8:"tosPage"};
const allPages = document.getElementsByClassName("specialPage");
const countyName = document.getElementById("countyName");
const stateName = document.getElementById("stateName"); 
const countyFIPSCode = document.getElementById("countyFIPSCode");
const stateSelectMenu = document.getElementById("stateSelectMenu");
const countyMenu = document.getElementById("countySelectMenu");
const dateOfDataMenu = document.getElementById("dateOfDataMenu");
const infectionRateForCounty = document.getElementById("infectionRate");
const vaccinationRateForCounty = document.getElementById("vaccinationRate");
const numOfCasesForCounty = document.getElementById("casesNum");
const numOfDeathsForCounty = document.getElementById("deathsNum");
const defaultDataset = [0, 0, 0, 0, 0, 0, 0];
const defaultLabel = ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"];

function revealPage(x) {
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";

        if (i + 1 == x) {
            document.getElementsByClassName(pages[x])[0].style.display = "";
        }
    }
}

const interval = setInterval(function() {
    if (getDataForMap(2, 56, 045) > 0) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("loaderText").style.display = "none";
        $(".leaflet-control-zoom").css("visibility", "visible");
        document.getElementById("map").style.opacity = "1.0";
        map._handlers.forEach(function(handler) {
            handler.enable();
        });
        osm.addTo(map);
        carto.addTo(map);
        googleStreets.addTo(map);
        googleSat.addTo(map);
        watercolor.addTo(map);
        CartoDB_DarkMatter.addTo(map);
        L.control.layers(baseLayers, null, {position: 'topleft'}).addTo(map);
        geojson = L.geoJson(countiesData, { style: styleCases, onEachFeature: onEachFeature }).addTo(map);
        legendForCases.addTo(map);
        info.addTo(map);
        clearInterval(interval);
    }
}, 5000);

function showPopUp(x) {
    var popup = document.getElementById(x);
    popup.classList.toggle("show");
}

$("#darkModeButton").on("click", function() {
    if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        $("body").css("background-color", "#c5c5c5");
        $("div.specialPage").css("background-color", "#e7e7e7c0");
        $("#darkModeButton").text("Dark Mode");
        $("#currMode").text("Dark Mode");
        $("div.whiteBox").css("background-color", "white");
        $("p").css("color", "black");
        $("b").css("color", "black");
        $("i").css("color", "black");
        $("em").css("color", "black");
        $("li").css("color", "black");
        $("a").css("color", "#0275d8");
        $(".modeTitle").css("color", "black");
        $(".tnrTitle").css("color", "black");
        $("i.nav-title").css("color", "white");
        $("i.nav-maintitle").css("color", "rgb(221, 221, 221)");
        $(".navbar").css("background-color", "#cacacab6");
        infectionRateChart.options.legend.labels.fontColor = "Gray";
        infectionRateChart.options.scales.yAxes[0].ticks.fontColor = "Gray";
        infectionRateChart.options.scales.xAxes[0].ticks.fontColor = "Gray";
        vaccinationRateChart.options.legend.labels.fontColor = "Gray";
        vaccinationRateChart.options.scales.yAxes[0].ticks.fontColor = "Gray";
        vaccinationRateChart.options.scales.xAxes[0].ticks.fontColor = "Gray";
        infectionRateChart.update();
        vaccinationRateChart.update();
    } 
    
    else {
        $("body").addClass("dark");
        $("body").css("background-color", "gray");
        $("div.specialPage").css("background-color", "rgb(90, 90, 90)");
        $("#darkModeButton").text("Light Mode");
        $("#currMode").text("Light Mode");
        $("div.whiteBox").css("background-color", "#292b2c");
        $("p").css("color", "lightgray");
        $("b").css("color", "white");
        $("i").css("color", "white");
        $("em").css("color", "lightgray");
        $("li").css("color", "lightgray");
        $("a").css("color", "#5bc0de");
        $(".modeTitle").css("color", "white");
        $(".tnrTitle").css("color", "white");
        $("i.nav-title").css("color", "white");
        $("#resetSelectionButton b").css("color", "black");
        $("i.nav-maintitle").css("color", "rgb(221, 221, 221)");
        $(".navbar").css("background-color", "#292b2c");
        infectionRateChart.options.legend.labels.fontColor = "White";
        infectionRateChart.options.scales.yAxes[0].ticks.fontColor = "White";
        infectionRateChart.options.scales.xAxes[0].ticks.fontColor = "White";
        vaccinationRateChart.options.legend.labels.fontColor = "White";
        vaccinationRateChart.options.scales.yAxes[0].ticks.fontColor = "White";
        vaccinationRateChart.options.scales.xAxes[0].ticks.fontColor = "White";
        infectionRateChart.update();
        vaccinationRateChart.update();
    }
});

function stateToCounties(str) {
    if (str == "00") {
        countyName.innerHTML = "County Name: N/A";
        stateName.innerHTML = "State Name or Initials: N/A";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
        countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
        dateOfDataMenu.disabled = true;
        dateOfDataMenu.value = "";
        dateOfDataMenu.min = "";
        dateOfDataMenu.max = "";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
    } 
    
    else {
        countyName.innerHTML = "County Name: N/A";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        fetch(`${URL}${str}`)
        .then(response => response.json())
        .then(data => populateCountySelectMenu(data['data']));
    }
}

function printFips(stateID, countyID) {
    if (stateID < 10) {
        stateID = '0'.concat(stateID.toString());
    }

    if (countyID < 10) {
        countyID = countyID.toString();
        countyID = "00" + countyID;
        return stateID.toString().concat(countyID);
    }

    else if (countyID > 10 && countyID < 100) {
        countyID = countyID.toString();
        countyID = "0" + countyID;
        return stateID.toString().concat(countyID);
    }

    else if (countyID > 99) {
        return stateID.toString().concat(countyID.toString());
    } 
}

function printCountyName(countyName) {
    var modifiedCountyName = countyName.replace(/_/g," ");

    if (modifiedCountyName.substr(modifiedCountyName.length - 11) == "Census Area") {
        modifiedCountyName = modifiedCountyName.substring(0, modifiedCountyName.length - 12);
    }

    if (modifiedCountyName.substr(modifiedCountyName.length - 16) == "City and Borough") {
        modifiedCountyName = modifiedCountyName.substring(0, modifiedCountyName.length - 17);
    }

    if (modifiedCountyName.substr(modifiedCountyName.length - 7) == "Borough") {
        modifiedCountyName = modifiedCountyName.substring(0, modifiedCountyName.length - 8);
    }

    if (modifiedCountyName.substr(modifiedCountyName.length - 23) == "plus Lake and Peninsula") {
        modifiedCountyName = modifiedCountyName.substring(0, modifiedCountyName.length - 24);
    }

    if (modifiedCountyName.substr(modifiedCountyName.length - 4) == "city" || modifiedCountyName.substr(modifiedCountyName.length - 4) == "City") {
        modifiedCountyName = modifiedCountyName.substring(0, modifiedCountyName.length - 5);
        return modifiedCountyName + " City";
    }

    else {
        return modifiedCountyName + " County";
    }
}

function populateCountySelectMenu(data) {
    countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
    datesArray = [];

    data.forEach(function ({state_ID, state_name, state_init, county_ID, county_name, dt}) {
        datesArray.push(`${dt}`.substring(0, 10));

        if ($("#countySelectMenu option[value = '" + printFips(`${state_ID}`, `${county_ID}`) + "']").length > 0) {}

        else {
            stateName.innerHTML = "State Name or Initials: " + `${state_name}` + " (" + `${state_init}` + ")"; 
            countyMenu.innerHTML += "<option value = '" + printFips(`${state_ID}`, `${county_ID}`) + "'>" + printCountyName(`${county_name}`) + "</option>";
        }
    });

    dateOfDataMenu.disabled = false;
    dateOfDataMenu.min = datesArray[0];
    dateOfDataMenu.max = datesArray.at(-1);
    if (dateOfDataMenu.value == "") { dateOfDataMenu.value = datesArray.at(-1); }
}

function showCountyData(str) {
    if (str == "00000") {
        countyName.innerHTML = "County Name: N/A";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        return;
    } 
    
    else {
        for (var i = 0; i < countiesData.features.length; i++) {
            if ((countiesData.features.at(i)["properties"]["ID"] + countiesData.features.at(i)["properties"]["COUNTY"]) == str) {
                let polygon = L.polygon(countiesData.features[i].geometry.coordinates);
                let southWest = polygon.getBounds().getSouthWest();
                let northEast = polygon.getBounds().getNorthEast();
                let cSouthWest = L.latLng(southWest.lng, southWest.lat);
                let cNortEast = L.latLng(northEast.lng, northEast.lat);
                let newBounds = L.latLngBounds(cSouthWest, cNortEast);
                map.fitBounds(newBounds);
                break;
            }
        }

        let x = str.substring(0, 2);
        $.each(states, function(k, v) {
            if (states[k].key == x) {
                fetch(`${URL}${states[k].value}`)
                .then(response => response.json())
                .then(data => loadData(str, data['data']));
            }
        });
    }
}

function changeDateOfData(str) {
    fetch(`${URL}${stateSelectMenu.value}`)
    .then(response => response.json())
    .then(data => loadData(str, data['data']));
}

function resetFunction() {
    countyName.innerHTML = "County Name: N/A";
    stateName.innerHTML = "State Name or Initials: N/A";
    countyFIPSCode.innerHTML = "County FIPS code: N/A";
    infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
    vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
    document.getElementById("stateSelectMenu").value = "00";
    countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
    dateOfDataMenu.disabled = true;
    dateOfDataMenu.value = "";
    dateOfDataMenu.min = "";
    dateOfDataMenu.max = "";
    datesArray = [];
    document.getElementById("typeOfMapMenu").value = "2";
    changeMapType("2");
    updateChart(infectionRateChart, defaultDataset, defaultLabel);
    updateChart(vaccinationRateChart, defaultDataset, defaultLabel);
    numOfCasesForCounty.innerHTML = "N/A";
    numOfDeathsForCounty.innerHTML = "N/A";
}

function loadData(str, data) {
    infRateArray = [];
    vaccRateArray = [];
    var tempDates = [];

    data.forEach(function ({state_ID, state_name, state_init, county_ID, county_name, county_infection_rate, county_vaccination_rate, cases, confirmed_deaths, dt}) {
        if (str == printFips(`${state_ID}`, `${county_ID}`)) {
            infRateArray.push(`${county_infection_rate}`);
            vaccRateArray.push(`${county_vaccination_rate}`);
            tempDates.push(`${dt}`.substring(0, 10));
        }

        if ((str == printFips(`${state_ID}`, `${county_ID}`)) && (dateOfDataMenu.value == (`${dt}`.substring(0, 10)))) {
            countyName.innerHTML = "County Name: " + printCountyName(`${county_name}`);
            stateName.innerHTML = "State Name or Initials: " + `${state_name}` + " (" + `${state_init}` + ")";
            countyFIPSCode.innerHTML = "County FIPS code: " + printFips(`${state_ID}`, `${county_ID}`);
            document.getElementById("countySelectMenu").value = (str);
            infectionRateForCounty.innerHTML = "Infection Rate: <b>" + `${county_infection_rate}` + "&nbsp;</b><i style = 'font-size: 16px;'>per 100k as of <b>" + `${dt}`.substring(0, 10) + "</b></i>";
            vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>" + `${county_vaccination_rate}` + "%&nbsp;</b><i style = 'font-size: 16px;'>fully vaccinated</i>";
            updateChart(infectionRateChart, infRateArray, tempDates);
            updateChart(vaccinationRateChart, vaccRateArray, tempDates);
            numOfCasesForCounty.innerHTML = `${cases}`;
            numOfDeathsForCounty.innerHTML = `${confirmed_deaths}`;
        }
    });
}

/*===================================================
        INFECTION AND VACCINATION GRAPH CODES             
===================================================*/

function updateChart(chart, newDataset, dates) {
    var plots = [];
    var dateLabels = [];

    for (var x = 7; x > 0; x--) {
        if ((newDataset.length - x) < 0 || (dates.length - x) < 0) {
            plots.push(0);
            dateLabels.push("Unavailable");
        }

        else {
            plots.push(newDataset[newDataset.length - x]);
            dateLabels.push(dates[dates.length - x].substring(5, dates[dates.length - x].lrngth));
        }
    }

    chart.data.labels = dateLabels;
    chart.data.datasets[0].data = plots;
    chart.update();
}

var getInfectionRateChart = document.getElementById("infectionRateChart").getContext('2d');
var infectionRateChart = new Chart(getInfectionRateChart, {
    type: 'line',
    data: {
        labels: defaultLabel,
        datasets: [{
            label: "Infection Rate",
            data: defaultDataset,
            backgroundColor: ['rgba(253, 53, 63, .2)',],
            borderColor: ['rgba(253, 10, 41, .7)',],
            borderWidth: 2
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: "Gray",
                fontSize: 12
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "Gray",
                    fontSize: 12,
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "Gray",
                    fontSize: 12,
                }
            }]
        },
        responsive: true
    }
});

var getVaccinationRateChart = document.getElementById("vaccinationRateChart").getContext('2d');
var vaccinationRateChart = new Chart(getVaccinationRateChart, {
    type: 'line',
    data: {
        labels: defaultLabel,
        datasets: [{
            label: "Vaccination Rate",
            data: defaultDataset,
            backgroundColor: ['rgba(107, 212, 255, .2)',],
            borderColor: ['rgba(39, 167, 255, .7)',],
            borderWidth: 2
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: "Gray",
                fontSize: 12
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "Gray",
                    fontSize: 12,
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "Gray",
                    fontSize: 12,
                }
            }]
        },
        responsive: true
    }
});

/*===================================================
                LEAFLET CODE              
===================================================*/

function loadMap() {
    L.geoJSON(countiesData).addTo(map);
    L.geoJson(countiesData, {style: styleCases}).addTo(map);
    changeMapType(mapColorNum);

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        if (mapColorNum == 0) {
            this._div.innerHTML = "<h5 id = 'mapBoxTitle'>COVID Infection Rates by County</h5>" +  (props ?
                '<b>' + printCountyName(props.NAME) + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + 
                getDataForMap(0, props.ID, props.COUNTY)
                + ' per 100k rate of infection' : 'Hover over a county');
        }
        
        if (mapColorNum == 1) {
            this._div.innerHTML = "<h5 id = 'mapBoxTitle'>COVID Vaccination Rates by County</h5>" +  (props ?
                '<b>' + printCountyName(props.NAME) + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + 
                getDataForMap(1, props.ID, props.COUNTY)
                + '% rate of vaccination' : 'Hover over a county');
        }

        if (mapColorNum == 2) {
            this._div.innerHTML = "<h5 id = 'mapBoxTitle'>COVID Cases by County</h5>" +  (props ?
                '<b>' + printCountyName(props.NAME) + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + 
                getDataForMap(2, props.ID, props.COUNTY)
                + ' confirmed positive cases (cumulative)' : 'Hover over a county');
        }

        if (mapColorNum == 3) {
            this._div.innerHTML = "<h5 id = 'mapBoxTitle'>COVID Deaths by County</h5>" +  (props ?
                '<b>' + printCountyName(props.NAME) + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + 
                getDataForMap(3, props.ID, props.COUNTY)
                + ' confirmed deaths' : 'Hover over a county');
        }
    };

    info.update2 = function (props) {
        document.getElementById("stateSelectMenu").value = props.INITIALS;
        stateToCounties(props.INITIALS);
        showCountyData(props.ID + props.COUNTY);
    };

    legendForInfs.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 9, 18, 27, 36, 45, 54, 63];
        
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style = "background:' + getColorForInfs(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        
        return div;
    };

    legendForVaccs.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 11, 22, 33, 44, 55, 66, 77];
        
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style = "background:' + getColorForVaccs(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        
        return div;
    };

    legendForCases.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 5000, 7000, 10000, 12000, 15000, 20000, 30000];
        
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style = "background:' + getColorForCases(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        
        return div;
    };
        
    legendForDeaths.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 100, 250, 500, 800, 1200, 1500, 1800];
    
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style = "background:' + getColorForDeaths(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
}

function changeMapType(val) {
    mapColorNum = val;

    switch (mapColorNum) {
        case "0":
            map.removeLayer(geojson);
            map.removeControl(legendForVaccs);
            map.removeControl(legendForCases);
            map.removeControl(legendForDeaths);
            geojson = L.geoJson(countiesData, {style: styleInfs, onEachFeature: onEachFeature});
            document.getElementById("mapBoxTitle").innerHTML = "<h5 id = 'mapBoxTitle'>COVID Infection Rates by County</h5>";
            map.addLayer(geojson);
            legendForInfs.addTo(map);
            break;

        case "1":
            map.removeLayer(geojson);
            map.removeControl(legendForInfs);
            map.removeControl(legendForCases);
            map.removeControl(legendForDeaths);
            geojson = L.geoJson(countiesData, {style: styleVaccs, onEachFeature: onEachFeature});
            document.getElementById("mapBoxTitle").innerHTML = "<h5 id = 'mapBoxTitle'>COVID Vaccination Rates by County</h5>";
            map.addLayer(geojson);
            legendForVaccs.addTo(map);
            break;
        
        case "2":
            map.removeLayer(geojson);
            map.removeControl(legendForInfs);
            map.removeControl(legendForVaccs);
            map.removeControl(legendForDeaths);
            geojson = L.geoJson(countiesData, {style: styleCases, onEachFeature: onEachFeature});
            document.getElementById("mapBoxTitle").innerHTML = "<h5 id = 'mapBoxTitle'>COVID Cases by County</h5>";
            map.addLayer(geojson);
            legendForCases.addTo(map);
            break;

        case "3":
            map.removeLayer(geojson);
            map.removeControl(legendForInfs);
            map.removeControl(legendForVaccs);
            map.removeControl(legendForCases);
            geojson = L.geoJson(countiesData, {style: styleDeaths, onEachFeature: onEachFeature});
            document.getElementById("mapBoxTitle").innerHTML = "<h5 id = 'mapBoxTitle'>COVID Deaths by County</h5>";
            map.addLayer(geojson);
            legendForDeaths.addTo(map);
            break;
    }
}

var map = L.map('map').setView([39.7128,-94.0060], 4.3);
var geojson;
var info = L.control();
var legendForInfs = L.control({position: 'bottomright'});
var legendForVaccs = L.control({position: 'bottomright'});
var legendForCases = L.control({position: 'bottomright'});
var legendForDeaths = L.control({position: 'bottomright'});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3']
});

var carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href = "https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
	maxZoom: 19
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3']
});

var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href = "http://stamen.com">Stamen Design</a>, <a href = "http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    maxZoom: 19,
    ext: 'jpg'
});

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var baseLayers = {
    "Dark" : CartoDB_DarkMatter,
    "Water Color" : watercolor,
    "Satellite" : googleSat,
    "Google Map" : googleStreets,
    "OpenStreetMap" : osm
};

function getColorForInfs(d) {
    return d > 63      ? '#800026' :
           d > 54      ? '#BD0026' :
           d > 45      ? '#E31A1C' :
           d > 36      ? '#FC4E2A' :
           d > 27      ? '#FD8D3C' :
           d > 18      ? '#FEB24C' :
           d > 9       ? '#FED976' :
                         '#FFEDA0' ;
}

function getColorForVaccs(d) {
    return d > 77      ? '#131A55' :
           d > 66      ? '#1B277C' :
           d > 55      ? '#274B93' :
           d > 44      ? '#3371AA' :
           d > 33      ? '#3F97C2' :
           d > 22      ? '#56B9D2' :
           d > 11      ? '#91D0CE' :
                         '#CEE6CA' ;
}

function getColorForCases(d) {
    return d > 30000   ? '#004629' :
           d > 20000   ? '#016738' :
           d > 15000   ? '#248444' :
           d > 12000   ? '#40AB5D' :
           d > 10000   ? '#79C57C' :
           d > 7000    ? '#B0DC91' :
           d > 5000    ? '#DAEFA2' :
                         '#FAFBB7' ;
}

function getColorForDeaths(d) {
    return d > 1800    ? '#33104A' :
           d > 1500    ? '#4B186C' :
           d > 1200    ? '#63218F' :
           d > 800     ? '#8F3192' :
           d > 500     ? '#C0458A' :
           d > 250     ? '#E8608A' :
           d > 100     ? '#EF9198' :
                         '#F8C1A8' ;
}
    
function getDataForMap(typeOfData, stateID, countyID) {
    var result;

    $.each(leafletCases, function(k, v) {
        if (leafletCases[k].key == printFips(parseInt(stateID), parseInt(countyID))) {
            switch (typeOfData) {
                case 0: result = (`${leafletInfs[k].value}`);   break;
                case 1: result = (`${leafletVaccs[k].value}`);  break;
                case 2: result = (`${leafletCases[k].value}`);  break;
                case 3: result = (`${leafletDeaths[k].value}`); break;
            }
        }
    });

    return result;
}
    
function styleInfs(feature) {
    return {
        fillColor: getColorForInfs(getDataForMap(0, feature.properties.ID, feature.properties.COUNTY)),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleVaccs(feature) {
    return {
        fillColor: getColorForVaccs(getDataForMap(1, feature.properties.ID, feature.properties.COUNTY)),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleCases(feature) {
    return {
        fillColor: getColorForCases(getDataForMap(2, feature.properties.ID, feature.properties.COUNTY)),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleDeaths(feature) {
    return {
        fillColor: getColorForDeaths(getDataForMap(3, feature.properties.ID, feature.properties.COUNTY)),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    info.update2(e.target.feature.properties);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
